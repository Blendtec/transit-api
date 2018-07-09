import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app/app.module';
import { ValidationPipe } from './app/modules/common/pipes';
import { useContainer } from 'class-validator';
import * as bodyParser from 'body-parser';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    useContainer(app.select(ApplicationModule), { fallback: true });

    app.useGlobalPipes(new ValidationPipe());
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
    app.use((req, res, next) => {
        if (req.headers.origin === process.env.CLIENT_ORIGIN) {
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        }
        next();
    });
    await app.listen(process.env.PORT || 3000);
}

bootstrap();
