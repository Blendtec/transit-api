import { LogService } from './services/logger.service';
import { MailComposerService } from './services/mail-composer.service';
import { SESService } from './services/ses.service';
import { SanitizerService } from './services/sanitizer.service';
import { EmailService } from './services/email.service';

export const commonProviders = [
    EmailService,
    SanitizerService,
    SESService,
    MailComposerService,
    LogService,
];