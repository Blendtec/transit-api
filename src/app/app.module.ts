import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductRegistrationModule } from './modules/product-registration';
import { SerialPrefixModule } from './modules/serial-prefix';
import { DatabaseModule } from './modules/database';

@Module({
  imports: [ProductRegistrationModule, SerialPrefixModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
