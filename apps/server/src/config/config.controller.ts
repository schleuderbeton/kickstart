import {ClassSerializerInterceptor, Controller, Get, SerializeOptions, UseInterceptors} from "@nestjs/common";
import {ConfigService} from "./config.service";
import {ClientConfig} from "common-dto";

@Controller('config')
export class ConfigController {

	constructor(private readonly configService: ConfigService) {}

	@Get("client")
	@UseInterceptors(ClassSerializerInterceptor)
	@SerializeOptions({excludeExtraneousValues: true})
	async getClientConfig(): Promise<ClientConfig> {
		return this.configService.getClientConfig();
	}
}
