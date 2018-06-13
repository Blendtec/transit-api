import { WarrantyEmail } from './../models/warranty-email.model';
import { Warranty } from './../models/warranty.entity';
import { EmailService } from './../../common/services/email.service';
import { Component } from '@nestjs/common';

@Component()
export class WarrantyEmailService {

    constructor(private readonly emailService: EmailService) {
    }

    send(warranty: Warranty): Promise<void[]> {

        const email = new WarrantyEmail(warranty);

        return Promise.all([
            this.emailService.send(process.env.WARRANTYEMAIL, email.subject, email.body, email.attachments),
            this.emailService.send(email.to, email.subject, email.body),
        ]);
    }
}