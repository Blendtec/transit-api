import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductRegistration } from '../models/product-registration.entity';
import { ProductRegistrationService } from '../services/product-registration.service';
import { CreateProductRegistrationDto } from '../models/create-product-registration.dto';
import { plainToClass } from 'class-transformer';

@Controller('product-registration')
export class ProductRegistrationController {
	constructor(private readonly productRegistrationService: ProductRegistrationService) {}

	@Get()
	findAll(): Promise<ProductRegistration[]> {
		return this.productRegistrationService.findAll();
	}

	@Post()
	async create( @Body() createProductRegistrationDto: CreateProductRegistrationDto) {
        const productRegistration = plainToClass(ProductRegistration, createProductRegistrationDto);
        await this.productRegistrationService.create(productRegistration);

	}

}