import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductRegistrationModule } from './modules/product-registration';
import { CommonModule } from './modules/common/common.module';
import { SerialNumberModule } from './modules/serial-number';
import { DatabaseModule } from './modules/database';
import { Validator, ValidationPipe } from 'class-validator';
import { SerialPrefix } from './modules/common/validators/serial-prefix.validator';

@Module({
    imports: [ProductRegistrationModule, SerialNumberModule, CommonModule, DatabaseModule],
    controllers: [AppController],
    components: [Validator, SerialPrefix],
})
export class ApplicationModule {
}
