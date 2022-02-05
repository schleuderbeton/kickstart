import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {constants} from "./constants";
import {createLogger} from "./util/winston.logger";

async function bootstrap() {
	const logger = createLogger();
	const app = await NestFactory.create(AppModule, {
		logger: logger
	});
	app.setGlobalPrefix("api");

	await app.listen(constants.port);
}

bootstrap().then();
