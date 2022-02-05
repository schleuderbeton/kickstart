import {Inject, Injectable} from '@nestjs/common';
import {ConfigType} from "@nestjs/config";
import {databaseConfig} from "../config";


@Injectable()
export class DatabaseConfigService {

	constructor(
		@Inject(databaseConfig.KEY)
		private database: ConfigType<typeof databaseConfig>
	) {	}

	get databaseConfig(){
		return this.database;
	}

	getDatabaseUrl(): string {
		let urlString = `${this.database.serviceHost}:${this.database.servicePort}/${this.database.supplierDatabaseName}`;
		if (this.database.username) {
			urlString = `${this.database.username}:${this.database.password}@${urlString}?authSource=${this.database.authSource}`;
		}
		// return `mongodb://${urlString}?authSource=${this.database.authSource}`;
		return `mongodb://${urlString}`;
	}
}
