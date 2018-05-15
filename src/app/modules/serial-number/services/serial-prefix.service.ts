import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SerialPrefix } from '../models/serial-prefix.entity';
import { Connection } from 'typeorm';

@Component()
export class SerialPrefixService {
    constructor(@Inject('SerialPrefixRepositoryToken') private readonly serialPrefixRepository: Repository<SerialPrefix>) {
    }

    async findAll(): Promise<SerialPrefix[]> {
        const repo = await this.serialPrefixRepository.find()
        let out = [];
        for (let i = 0; i < repo.length; i++) {
            out.push(repo[i].prefix);
        }
        return out;
    }

    async findPrefix(value): Promise<SerialPrefix[]> {
    	return await this.serialPrefixRepository.find({
				'prefix': value
			});
    }
}