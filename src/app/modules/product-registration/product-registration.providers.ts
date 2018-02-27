import { Connection } from 'typeorm';
import { ProductRegistration } from './models/product-registration.entity';
import { ProductRegistrationService } from './services/product-registration.service';

export const productRegistrationProviders = [
	{
		provide: 'ProductRegistrationRepositoryToken',
		useFactory: (connection: Connection) => connection.getRepository(ProductRegistration),
		inject: ['DbConnectionToken'],
	},
	ProductRegistrationService
];