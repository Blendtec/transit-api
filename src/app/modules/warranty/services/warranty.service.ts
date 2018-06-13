import { WarrantyEmailService } from './warranty-email.service';
import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Warranty } from '../models/warranty.entity';

@Component()
export class WarrantyService {
    constructor(@Inject('WarrantyRepositoryToken') private readonly warrantyRepository: Repository<Warranty>,
                private readonly emailService: WarrantyEmailService) {}

    async findAll(): Promise<Warranty[]> {
        return await this.warrantyRepository.find();
    }

    async create(warranty: Warranty): Promise<Warranty> {
        const newWarranty = await this.warrantyRepository.save(warranty);
        this.emailService.send(warranty);
        return newWarranty;
    }
}