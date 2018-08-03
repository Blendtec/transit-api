import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { DealersController } from './controllers/dealers.controller';
import { dealersProviders } from './dealers.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [DealersController],
    components: [...dealersProviders],
})
export class DealersModule {
}
