import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app/app.module';
import { ValidationPipe } from './app/validators/validation.pipe';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	app.useGlobalPipes(new ValidationPipe());
	app.use(function(req, res, next) {
		if (req.headers.origin === 'http://blendtec.test' || req.headers.origin === 'https://old.blendtec.com') {
		  res.header("Access-Control-Allow-Origin", req.headers.origin);
		  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		} else if (req.method === 'POST') {
			return;
		}
	  next();
	});
	await app.listen(process.env.PORT || 3000);
}
bootstrap();
