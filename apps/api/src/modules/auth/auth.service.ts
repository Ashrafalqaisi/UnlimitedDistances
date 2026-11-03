import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { createHash, randomBytes } from 'node:crypto';
import { MailService } from '../../mail/mail.service';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

const REFRESH_TTL_DAYS = 30;
const VERIFY_TTL_HOURS = 24;
const RESEND_COOLDOWN_SECONDS = 60;
const DUMMY_HASH = bcrypt.hashSync('timing-equalizer', 12);

// Clients map the code onto the form field; the message is a fallback for display
const CONFLICTS: Record<string, { code: string; message: string }> = {
  email: { code: 'EMAIL_TAKEN', message: 'Email already registered' },
  username: { code: 'USERNAME_TAKEN', message: 'Username already taken' },
  phone: { code: 'PHONE_TAKEN', message: 'Phone number already registered' },
};

const conflict = (field: string) => new ConflictException({ statusCode: 409, ...CONFLICTS[field] });

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly mail: MailService,
    private readonly config: ConfigService,
  ) {}

  /** Creates the account, emails a verification link, and signs the runner in straight away. */
  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email },
          { username: dto.username },
          ...(dto.phone ? [{ phone: dto.phone }] : []),
        ],
      },
      select: { email: true, username: true },
    });
    if (existing) {
      const field =
        existing.email === dto.email ? 'email' : existing.username === dto.username ? 'username' : 'phone';
      throw conflict(field);
    }

    let user;
    try {
      user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          phone: dto.phone,
          passwordHash: await bcrypt.hash(dto.password, 12),
          fullName: dto.fullName,
          locale: dto.locale ?? 'en',
          role: 'RUNNER',
          runnerProfile: { create: {} },
        },
      });
    } catch (error) {
      // A concurrent registration with the same email, username or phone won the race to the unique index
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        const fields = (error.meta?.target as string[] | undefined) ?? [];
        const field = fields.find((name) => name in CONFLICTS) ?? 'email';
        throw conflict(field);
      }
      throw error;
    }

    await this.sendVerificationEmail(user);
    return this.issueTokens(user);
  }

  async login(dto: LoginDto) {
    // Usernames cannot contain "@", so the identifier's shape says which column to look in
    const user = await this.prisma.user.findUnique({
      where: dto.identifier.includes('@') ? { email: dto.identifier } : { username: dto.identifier },
    });
    // Compare against a dummy hash for unknown users so response time doesn't reveal which accounts exist
    const passwordOk = await bcrypt.compare(dto.password, user?.passwordHash ?? DUMMY_HASH);

    // Same error for unknown email or username, wrong password, and disabled account
    if (!user || !passwordOk || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Checked only after the password, so this answer never reveals anything to someone without it.
    // The email is returned so the client can offer to resend the link when the runner typed a username.
    if (!user.emailVerifiedAt) {
      throw new ForbiddenException({
        statusCode: 403,
        code: 'EMAIL_NOT_VERIFIED',
        message: 'Verify your email before signing in',
        email: user.email,
      });
    }
    return this.issueTokens(user);
  }

  /** The signed-in user. Unverified users are allowed, so clients can show a "confirm your email" reminder. */
  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        username: true,
        phone: true,
        locale: true,
        role: true,
        isActive: true,
        emailVerifiedAt: true,
      },
    });
    // The access token can outlive a deleted or disabled account by up to its TTL
    if (!user || !user.isActive) throw new UnauthorizedException();

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      phone: user.phone,
      locale: user.locale,
      role: user.role,
      emailVerified: user.emailVerifiedAt !== null,
    };
  }

  async verifyEmail(token: string) {
    const stored = await this.prisma.emailVerificationToken.findUnique({
      where: { tokenHash: this.hash(token) },
    });
    if (!stored || stored.usedAt || stored.expiresAt < new Date()) {
      throw new BadRequestException('Verification link is invalid or has expired');
    }

    const now = new Date();
    await this.prisma.$transaction([
      // Mark every outstanding link for this user as used, not just this one
      this.prisma.emailVerificationToken.updateMany({
        where: { userId: stored.userId, usedAt: null },
        data: { usedAt: now },
      }),
      this.prisma.user.updateMany({
        where: { id: stored.userId, emailVerifiedAt: null },
        data: { emailVerifiedAt: now },
      }),
    ]);
  }

  /** Always succeeds silently, so the endpoint can't be used to find out which emails are registered. */
  async resendVerification(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.emailVerifiedAt || !user.isActive) return;

    const recent = await this.prisma.emailVerificationToken.findFirst({
      where: {
        userId: user.id,
        createdAt: { gt: new Date(Date.now() - RESEND_COOLDOWN_SECONDS * 1000) },
      },
    });
    if (recent) return;

    await this.sendVerificationEmail(user);
  }

  /** Rotates the refresh token: the presented one is revoked and a new pair is issued. */
  async refresh(refreshToken: string) {
    const stored = await this.prisma.refreshToken.findUnique({
      where: { tokenHash: this.hash(refreshToken) },
      include: { user: true },
    });

    if (!stored || stored.expiresAt < new Date() || !stored.user.isActive) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Revoke only if still active, so of two concurrent refreshes exactly one succeeds.
    const { count } = await this.prisma.refreshToken.updateMany({
      where: { id: stored.id, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    // An already-revoked token being presented means it was stolen or replayed:
    // end every session for this user so the attacker's rotated token dies too.
    if (count === 0) {
      await this.prisma.refreshToken.updateMany({
        where: { userId: stored.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.issueTokens(stored.user);
  }

  async logout(refreshToken: string) {
    await this.prisma.refreshToken.updateMany({
      where: { tokenHash: this.hash(refreshToken), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  private async sendVerificationEmail(user: { id: string; email: string; fullName: string; locale: string }) {
    // Opaque random token; only its hash is stored, like refresh tokens.
    const token = randomBytes(32).toString('base64url');
    await this.prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        tokenHash: this.hash(token),
        expiresAt: new Date(Date.now() + VERIFY_TTL_HOURS * 60 * 60 * 1000),
      },
    });

    const webUrl = this.config.get<string>('WEB_URL', 'http://localhost:3001');
    const link = `${webUrl}/${user.locale}/verify-email?token=${token}`;
    const arabic = user.locale === 'ar';

    await this.mail.send({
      to: user.email,
      subject: arabic ? 'أكّد بريدك الإلكتروني - مسافات بلا حدود' : 'Confirm your email - Unlimited Distances',
      text: arabic
        ? `مرحباً ${user.fullName}،\n\nافتح الرابط التالي لتأكيد بريدك الإلكتروني:\n${link}\n\nينتهي الرابط خلال ${VERIFY_TTL_HOURS} ساعة.`
        : `Hi ${user.fullName},\n\nOpen this link to confirm your email:\n${link}\n\nThe link expires in ${VERIFY_TTL_HOURS} hours.`,
    });
  }

  private async issueTokens(user: { id: string; role: Role }) {
    const accessToken = await this.jwt.signAsync({ sub: user.id, role: user.role });

    // Opaque random token. Only its hash is stored, so a database leak does not expose sessions.
    const refreshToken = randomBytes(48).toString('base64url');
    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: this.hash(refreshToken),
        expiresAt: new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken };
  }

  private hash(value: string) {
    return createHash('sha256').update(value).digest('hex');
  }
}
