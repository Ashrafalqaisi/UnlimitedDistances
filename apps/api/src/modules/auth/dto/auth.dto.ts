import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

// Keep these rules in sync with packages/shared/src/validation.ts, which the web and mobile forms use.
export const USERNAME_PATTERN = /^[a-z][a-z0-9._]{2,29}$/;
export const PHONE_PATTERN = /^\+?[0-9]{7,15}$/;
export const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$/;

const lowercaseTrim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toLowerCase() : value;

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

// Spaces, dashes and brackets are common when typing a number; store digits and a leading "+" only.
const normalizePhone = ({ value }: { value: unknown }) => {
  if (typeof value !== 'string') return value;
  const phone = value.replace(/[\s\-()]/g, '');
  return phone === '' ? undefined : phone;
};

export class RegisterDto {
  @Transform(trim)
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName!: string;

  @Transform(lowercaseTrim)
  @IsEmail()
  @MaxLength(254)
  email!: string;

  // No "@" allowed, so login can tell a username apart from an email.
  @Transform(lowercaseTrim)
  @Matches(USERNAME_PATTERN, {
    message: 'username must be 3-30 characters: letters, digits, dot or underscore, starting with a letter',
  })
  username!: string;

  @IsOptional()
  @Transform(normalizePhone)
  @Matches(PHONE_PATTERN, { message: 'phone must be 7-15 digits, optionally starting with +' })
  phone?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72) // bcrypt input limit
  @Matches(PASSWORD_PATTERN, {
    message: 'password must contain an uppercase letter, a number and a special character',
  })
  password!: string;

  @IsOptional()
  @IsIn(['en', 'ar'])
  locale?: 'en' | 'ar';
}

export class LoginDto {
  /** Email address or username. */
  @Transform(lowercaseTrim)
  @IsString()
  @MinLength(1)
  @MaxLength(254)
  identifier!: string;

  @IsString()
  @MaxLength(72)
  password!: string;
}

export class RefreshDto {
  @IsString()
  @MinLength(20)
  refreshToken!: string;
}

export class VerifyEmailDto {
  @IsString()
  @MinLength(20)
  @MaxLength(200)
  token!: string;
}

export class ResendVerificationDto {
  @Transform(lowercaseTrim)
  @IsEmail()
  email!: string;
}
