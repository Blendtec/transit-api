import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductRegistration } from '../models/product-registration.entity';

@Component()
export class ProductRegistrationService {
	constructor(@Inject('ProductRegistrationRepositoryToken')
		        private readonly productRegistrationRepository: Repository<ProductRegistration>) {}

	async findAll(): Promise<ProductRegistration[]> {
		return await this.productRegistrationRepository.find();
	}

	async create(productRegistration: ProductRegistration): Promise<ProductRegistration> {
		return await this.productRegistrationRepository.save(productRegistration);
	}
}