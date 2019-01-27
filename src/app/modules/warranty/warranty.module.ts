// @format
import { Module } from '@nestjs/common';
import { CommonModule } from '../common';
import { warrantyProviders } from './warranty.providers';
import { DatabaseModule } from '../database';
import { WarrantyController } from './controllers/warranty.controller';

@Module({
    imports: [CommonModule, DatabaseModule],
    components: [...warrantyProviders],
    exports: [...warrantyProviders],
    controllers: [WarrantyController],
})
export class WarrantyModule {}
