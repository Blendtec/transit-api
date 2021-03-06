// @format
import { Connection } from 'typeorm';
import { Warranty } from './models/warranty.entity';
import { WarrantyService } from './services/warranty.service';
import { WarrantyEmailService } from './services/warranty-email.service';

export const warrantyProviders = [
    {
        provide: 'WarrantyRepositoryToken',
        useFactory: (connection: Connection) =>
            connection.getRepository(Warranty),
        inject: ['DbConnectionToken'],
    },
    WarrantyService,
    WarrantyEmailService,
];
