import { Connection } from 'typeorm';
import { Dealers } from './models/dealers.entity';
import { DealersService } from './services/dealers.service';

export const dealersProviders = [
    {
        provide: 'DealersRepositoryToken',
        useFactory: (connection: Connection) => connection.getRepository(Dealers),
        inject: ['DbConnectionToken'],
    },
    DealersService,
];