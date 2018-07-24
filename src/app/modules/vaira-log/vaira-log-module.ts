import { Module } from '@nestjs/common';
import { vairaLogProviders } from './vaira-log.providers';
import { DatabaseModule } from '../database';
import { VairaLogController } from './controllers/vaira-log.controller';

@Module({
    imports: [DatabaseModule],
    components: [...vairaLogProviders],
    exports: [...vairaLogProviders],
    controllers: [VairaLogController],
})
export class VairaLogModule {}