import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { SerialPrefix } from '../models/serial-prefix.entity';
import { SerialPrefixService } from '../services/serial-prefix.service';
import { createSerialPrefixDto } from '../models/create-serial-prefix.dto';
import { plainToClass } from 'class-transformer';

@Controller('serial-prefix')
export class SerialPrefixController {
	constructor(private readonly serialPrefixService: SerialPrefixService) {}

	@Get()
	findAll(@Req() request): Promise<SerialPrefix[]> {
		if (request['query']['serial']) {
			return this.serialPrefixService.findSerial(request['query']['serial']);
		} else {
			return this.serialPrefixService.findAll();
		}
		
	}

}