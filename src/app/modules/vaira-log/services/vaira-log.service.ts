import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VairaLog } from '../models/vaira-log.entity';

@Component()
export class VairaLogService {
    constructor(
        @Inject('VairaLogRepositoryToken')
        private readonly vairaLogRepository: Repository<VairaLog>,
    ) {}

    async findAll(): Promise<VairaLog[]> {
        return await this.vairaLogRepository.find();
    }

    async create(vairaLog: VairaLog): Promise<VairaLog> {
        return await this.vairaLogRepository.save(vairaLog);
    }
}
