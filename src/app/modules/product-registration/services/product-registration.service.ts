import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductRegistration } from '../models/product-registration.entity';
import { ProductRegistrationEmailService } from './product-registration-email.service';

@Component()
export class ProductRegistrationService {
    constructor(@Inject('ProductRegistrationRepositoryToken')
                private readonly productRegistrationRepository: Repository<ProductRegistration>,
                private readonly emailService: ProductRegistrationEmailService,
    ) {}

    async findAll(): Promise<ProductRegistration[]> {
        return await this.productRegistrationRepository.find();
    }

    async create(productRegistration: ProductRegistration): Promise<ProductRegistration> {
        const newRegistration = await this.productRegistrationRepository.save(productRegistration);
        this.emailService.send(productRegistration);
        return newRegistration;
    }
}
