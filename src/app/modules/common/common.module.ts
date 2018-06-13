import { Module } from '@nestjs/common';
import { commonProviders } from './common.providers';

@Module({
    imports: [],
    controllers: [],
    components: [...commonProviders],
    exports: [...commonProviders],
})
export class CommonModule {}
