import { Module } from '@nestjs/common';
import { productRegistrationProviders } from './product-registration.providers';
import { DatabaseModule } from '../database';
import { ProductRegistrationController } from './controllers/product-registration.controller';

@Module({
	imports: [DatabaseModule],
	components: [...productRegistrationProviders],
	exports: [...productRegistrationProviders],
	controllers: [ProductRegistrationController]
})
export class ProductRegistrationModule {}