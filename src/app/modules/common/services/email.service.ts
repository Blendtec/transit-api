// @format
import { LogService } from './logger.service';
import { SESService } from './ses.service';
import { Component } from '@nestjs/common';
import { EmailAttachment } from '../models/';
import { MailComposerService } from './mail-composer.service';

@Component()
export class EmailService {
    constructor(
        private awsService: SESService,
        private mailComposerService: MailComposerService,
        private logService: LogService
    ) {}

    async send(
        to: string,
        subject: string,
        html: string,
        attachments: EmailAttachment[] = [],
        from: string = 'noreply@blendtec.com'
    ): Promise<void> {
        const text = html.replace(/<[^>]+>/g, '');
        const awsCallBack = (awsErr, message) => {
            this.awsService
                .sendRawEmail(message)
                .then(this.logService.log)
                .catch(err => this.logService.error(awsErr, err));
        };
        this.mailComposerService.init({
            from,
            subject,
            text,
            html,
            to,
            attachments,
        });
        await this.mailComposerService.build(awsCallBack);
    }
}
