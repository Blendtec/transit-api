import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SerialPrefix } from '../models/serial-prefix.entity';
import * as SqlString from 'sqlstring';

@Component()
export class SerialPrefixService {
	constructor(@Inject('SerialPrefixRepositoryToken')
		        private readonly serialPrefixRepository: Repository<SerialPrefix>) {}

	async findAll(): Promise<SerialPrefix[]> {
		return await this.serialPrefixRepository.find();
	}

	async findSerial(serialPrefix: string): Promise<SerialPrefix[]> {
		return await this.serialPrefixRepository.find({
			prefix: serialPrefix
		});
	}

	async create(serialPrefix: SerialPrefix): Promise<SerialPrefix> {
		return await this.serialPrefixRepository.save(serialPrefix);
	}
}