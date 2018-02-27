import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductRegistrationModule } from './modules/product-registration';
import { DatabaseModule } from './modules/database';

@Module({
  imports: [ProductRegistrationModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
