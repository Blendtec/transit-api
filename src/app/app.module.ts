import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductRegistrationModule } from './modules/product-registration';
import { WarrantyModule } from './modules/warranty';
import { CommonModule } from './modules/common/common.module';
import { SerialNumberModule } from './modules/serial-number';
import { DatabaseModule } from './modules/database';
import { Validator } from 'class-validator';
import { SerialPrefix } from './modules/common/validators/serial-prefix.validator';
import { HttpModule } from '@nestjs/common/http';
import { DealersModule } from './modules/dealers/dealers.module';
import { VairaLogModule } from './modules/vaira-log/vaira-log-module';

@Module({
    imports: [
        HttpModule,
        CommonModule,
        DatabaseModule,
        VairaLogModule,
        ProductRegistrationModule,
        SerialNumberModule,
        WarrantyModule,
        DealersModule
    ],
    controllers: [AppController],
    components: [Validator, SerialPrefix],
})
export class ApplicationModule {
}
