// @format
import { Controller, Post, Body, Get } from '@nestjs/common';
import { VairaLog } from '../models/vaira-log.entity';
import { VairaLogService } from '../services/vaira-log.service';
import { CreateVairaLogDto } from '../models/create-vaira-log.dto';
import { plainToClass } from 'class-transformer';

@Controller('vaira-log')
export class VairaLogController {
    constructor(private readonly vairaLogService: VairaLogService) {}

    @Post()
    async create(@Body() createVairaLogDto: CreateVairaLogDto) {
        const vairaLog = plainToClass(VairaLog, createVairaLogDto);
        await this.vairaLogService.create(vairaLog);
    }

    @Get()
    async findAll(): Promise<VairaLog[]> {
        return this.vairaLogService.findAll();
    }
}
