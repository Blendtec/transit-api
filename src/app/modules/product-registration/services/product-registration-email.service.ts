import { Component } from '@nestjs/common';
import { EmailService } from '../../common/services/email.service';
import { ProductRegistration } from '../models/product-registration.entity';
import { ProductRegistrationEmail } from '../models/product-registration-email.model';

@Component()
export class ProductRegistrationEmailService {

    constructor(private readonly emailService: EmailService) {
    }

    send(productRegistration: ProductRegistration): Promise<void> {
        const email = new ProductRegistrationEmail(productRegistration);
        return this.emailService.send(email.to, email.subject, email.body);
    }
}
