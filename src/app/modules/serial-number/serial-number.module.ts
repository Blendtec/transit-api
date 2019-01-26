// @format
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { SerialNumberController } from './controllers/serial-number.controller';
import { serialNumberProviders } from './serial-number.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [SerialNumberController],
    components: [...serialNumberProviders],
})
export class SerialNumberModule {
}
