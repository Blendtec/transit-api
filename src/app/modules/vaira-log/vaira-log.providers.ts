import { Connection } from 'typeorm';
import { VairaLog } from './models/vaira-log.entity';
import { VairaLogService } from './services/vaira-log.service';

export const vairaLogProviders = [
    {
        provide: 'VairaLogRepositoryToken',
        useFactory: (connection: Connection) => connection.getRepository(VairaLog),
        inject: ['DbConnectionToken'],
    },
    VairaLogService,
];