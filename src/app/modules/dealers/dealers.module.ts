import { Module } from '@nestjs/common';
import { CommonModule } from '../common';
import { DatabaseModule } from '../database';
import { DealersController } from './controllers/dealers.controller';
import { dealersProviders } from './dealers.providers';

@Module({
    imports: [CommonModule, DatabaseModule],
    controllers: [DealersController],
    components: [...dealersProviders],
})
export class DealersModule {
}
