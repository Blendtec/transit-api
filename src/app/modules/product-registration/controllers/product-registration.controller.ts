import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductRegistration } from '../models/product-registration.entity';
import { ProductRegistrationService } from '../services/product-registration.service';
import { CreateProductRegistrationDto } from '../models/create-product-registration.dto';

@Controller('product-registration')
export class ProductRegistrationController {
	constructor(private readonly productRegistrationService: ProductRegistrationService) {}

	@Get()
	findAll(): Promise<ProductRegistration[]> {
		return this.productRegistrationService.findAll();
	}

	@Post()
	async create( @Body() createProductRegistrationDto: CreateProductRegistrationDto) {
		const newEntry = Object.assign({}, createProductRegistrationDto, {
			createdOn: new Date().toISOString(),
			modifiedOn: new Date().toISOString(),
		});
		await this.productRegistrationService.create(newEntry);
	}

}