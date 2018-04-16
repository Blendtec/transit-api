import { Controller, Get }     from '@nestjs/common';
import { SerialPrefix }        from '../models/serial-prefix.entity';
import { SerialPrefixService } from '../services/serial-prefix.service';

@Controller('serial-numbers')
export class SerialNumberController {
    constructor(private readonly serialNumberService: SerialPrefixService) {
    }

    @Get('prefixes')
    prefixes(): Promise<SerialPrefix[]> {
        return this.serialNumberService.findAll();
    }
}