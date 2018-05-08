import { Module } from '@nestjs/common';
import { serialPrefixProviders } from './serial-prefix.providers';
import { DatabaseModule } from '../database';
import { SerialPrefixController } from './controllers/serial-prefix.controller';

@Module({
	imports: [DatabaseModule],
	components: [...serialPrefixProviders],
	exports: [...serialPrefixProviders],
	controllers: [SerialPrefixController],
})
export class SerialPrefixModule {}