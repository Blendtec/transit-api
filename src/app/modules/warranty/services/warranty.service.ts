import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Warranty } from '../models/warranty.entity';

@Component()
export class WarrantyService {
	constructor(@Inject('WarrantyRepositoryToken')
		        private readonly warrantyRepository: Repository<Warranty>) {}

	async findAll(): Promise<Warranty[]> {
		return await this.warrantyRepository.find();
	}

	async create(warranty: Warranty): Promise<Warranty> {
		return await this.warrantyRepository.save(warranty);
	}
}