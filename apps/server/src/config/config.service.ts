import {HttpModuleOptions, Inject, Injectable} from '@nestjs/common';
import {ConfigType} from "@nestjs/config";
import {appConfig, axiosConfig, databaseConfig, sendgridConfig} from "./config";
import {ClientConfig} from "common-dto";


@Injectable()
export class ConfigService {

	private readonly clientConfig:ClientConfig;

	constructor(
		@Inject(appConfig.KEY)
		private app: ConfigType<typeof appConfig>,
		@Inject(axiosConfig.KEY)
		private axios: ConfigType<typeof axiosConfig>,
		@Inject(databaseConfig.KEY)
		private db: ConfigType<typeof databaseConfig>,
		@Inject(sendgridConfig.KEY)
		private sendgrid: ConfigType<typeof sendgridConfig>,
	) {
		//create instance of ClientConfig with selected configuration values
		this.clientConfig = new ClientConfig();
		this.clientConfig.env = this.app.environment;
		this.clientConfig.name = this.app.name;
		this.clientConfig.version = this.app.version;
	}

	get appConfig(){
		return this.app;
	}

	get axiosConfig():HttpModuleOptions{
		return this.axios;
	}

	get databaseConfig() {
		return this.db;
	}

	get sendgridConfig(){
		return this.sendgrid;
	}

	getClientConfig(): ClientConfig {
		return this.clientConfig;
	}
}
