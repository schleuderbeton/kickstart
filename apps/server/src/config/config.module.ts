import {Global, Module} from '@nestjs/common';
import {ConfigService} from './config.service';
import {ConfigModule as NestConfigModule} from "@nestjs/config";
import {
	appConfig,
	axiosConfig,
	databaseConfig,
	sendgridConfig
} from "./config";
import {validate} from "./env.vars";
import {ConfigController} from "./config.controller";
import {DatabaseConfigService} from "./services/database.config.service";
import {SendgridConfigService} from "./services/sendgrid.config.service";

@Global()
@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true,
			validate: validate,
			load: [
				appConfig,
				axiosConfig,
				databaseConfig,
				sendgridConfig
			],
			envFilePath: [process.env.PATH_ENV_FILE || "../../.env.local"]
		})
	],
	controllers: [ConfigController],
	providers: [
		ConfigService,
		DatabaseConfigService,
		SendgridConfigService
	],
	exports: [
		ConfigService,
		DatabaseConfigService,
		SendgridConfigService
	]
})
export class ConfigModule {
}
