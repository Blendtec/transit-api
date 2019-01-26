// @format
import { Controller, Post, Body } from '@nestjs/common';
import { ProductRegistration, CreateProductRegistrationDto } from '../models';
import { ProductRegistrationService } from '../services';
import { plainToClass } from 'class-transformer';

@Controller('product-registration')
export class ProductRegistrationController {
    constructor(
        private readonly productRegistrationService: ProductRegistrationService
    ) {}

    @Post()
    async create(
        @Body() createProductRegistrationDto: CreateProductRegistrationDto
    ) {
        const productRegistration = plainToClass(
            ProductRegistration,
            createProductRegistrationDto
        );
        await this.productRegistrationService.create(productRegistration);
    }
}
