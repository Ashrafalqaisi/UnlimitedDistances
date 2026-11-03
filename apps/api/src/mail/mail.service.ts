import { Injectable, Logger } from '@nestjs/common';

export interface MailMessage {
  to: string;
  subject: string;
  text: string;
}

/**
 * Sends transactional email. No provider is wired up yet, so messages are written to the API log;
 * replace the body of send() with the chosen provider (SES, Resend, SMTP, ...) without touching callers.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  async send(message: MailMessage): Promise<void> {
    this.logger.log(`Email to ${message.to} | ${message.subject}\n${message.text}`);
  }
}
