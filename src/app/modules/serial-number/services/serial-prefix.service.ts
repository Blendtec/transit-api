import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SerialPrefix } from '../models/serial-prefix.entity';

@Component()
export class SerialPrefixService {
    constructor(@Inject('SerialPrefixRepositoryToken') private readonly serialPrefixRepository: Repository<SerialPrefix>) {
    }

    async findAll(): Promise<SerialPrefix[]> {
    	console.log('find all fired');
        return await this.serialPrefixRepository.find();
    }
}