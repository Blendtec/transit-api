import { Controller, Get, Post, Body } from '@nestjs/common';
import { Warranty } from '../models/warranty.entity';
import { WarrantyService } from '../services/warranty.service';
import { CreateWarrantyDto } from '../models/create-warranty.dto';
import { plainToClass } from 'class-transformer';

@Controller('warranty')
export class WarrantyController {
	constructor(private readonly warrantyService: WarrantyService) {}

	@Post()
	async create( @Body() createWarrantyDto: CreateWarrantyDto) {
        const warranty = plainToClass(Warranty, createWarrantyDto);
        await this.warrantyService.create(warranty);

	}

}
