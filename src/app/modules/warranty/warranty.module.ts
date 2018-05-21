import { Module } from '@nestjs/common';
import { warrantyProviders } from './warranty.providers';
import { DatabaseModule } from '../database';
import { WarrantyController } from './controllers/warranty.controller';

@Module({
	imports: [DatabaseModule],
	components: [...warrantyProviders],
	exports: [...warrantyProviders],
	controllers: [WarrantyController],
})
export class WarrantyModule {}