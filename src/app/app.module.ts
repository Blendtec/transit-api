import { Module }                    from '@nestjs/common';
import { AppController }             from './app.controller';
import { ProductRegistrationModule } from './modules/product-registration';
import { CommonModule }              from './modules/common/common.module';
import { SerialNumberModule }        from './modules/serial-number';

@Module({
  imports: [ProductRegistrationModule, SerialNumberModule, CommonModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
