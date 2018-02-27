import { createConnection } from 'typeorm';

export const databaseProviders = [
	{
		provide: 'DbConnectionToken',
		useFactory: async () => await createConnection({
			type: 'mysql',
			host: process.env.DB_HOST,
			port: 3306,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [
				__dirname + '/../**/*.entity{.ts,.js}',
			],
			synchronize: true,
		}),
	},
];