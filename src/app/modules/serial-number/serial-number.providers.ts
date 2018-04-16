import { Connection }          from 'typeorm';
import { SerialPrefix }        from './models/serial-prefix.entity';
import { SerialPrefixService } from './services/serial-prefix.service';

export const serialNumberProviders = [
	{
		provide: 'SerialPrefixRepositoryToken',
		useFactory: (connection: Connection) => connection.getRepository(SerialPrefix),
		inject: ['DbConnectionToken'],
	},
	SerialPrefixService,
];