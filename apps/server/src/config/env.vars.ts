import { plainToClass } from 'class-transformer';
import {IsEnum, IsNotEmpty, IsNumber, ValidateIf, validateSync} from 'class-validator';
import {Environment} from "common-dto";

class EnvironmentVariables {

	@IsEnum(Environment)
	ENVIRONMENT: Environment;

	@IsNotEmpty()
	@ValidateIf(() => validateEnvVars)
	NODE_ENV:string;

	@IsNumber()
	@ValidateIf(() => validateEnvVars)
	PORT: number;

	@IsNotEmpty()
	@ValidateIf(() => validateEnvVars)
	APP_NAME:string;

	@IsNotEmpty()
	@ValidateIf(() => validateEnvVars)
	APP_VERSION:string;

	@IsNotEmpty()
	@ValidateIf(() => validateEnvVars)
	URL_WEBAPP:string;

	@IsNotEmpty()
	@ValidateIf(() => validateEnvVars)
	HTTP_PROXY:string;

	@IsNotEmpty()
	@ValidateIf(() => validateEnvVars)
	HTTPS_PROXY:string;

	@IsNotEmpty()
	MONGODB_SERVICE_HOST: string;

	@IsNotEmpty()
	MONGODB_SERVICE_PORT_MONGODB:string;

	@IsNotEmpty()
	MONGODB_DATABASE:string;

	@IsNotEmpty()
	@ValidateIf(() => validateEnvVars)
	MONGODB_USERNAME:string;

	@IsNotEmpty()
	@ValidateIf(() => validateEnvVars)
	MONGODB_PASSWORD:string;
}

let validateEnvVars = true;

export function validate(config: Record<string, unknown>) {
	validateEnvVars = config.ENVIRONMENT !== Environment.Local;
	const validatedConfig = plainToClass(
		EnvironmentVariables,
		config,
		{enableImplicitConversion: true}
	);
	const errors = validateSync(validatedConfig, { skipMissingProperties: false });
	if (errors.length > 0) {
		let errorMessage = "Environment variables validation:\n";
		for (let error of errors) {
			for (let key in error.constraints) {
				errorMessage += `${error.constraints[key]}\n`;
			}
		}
		throw new Error(errorMessage);
	}
	return validatedConfig;
}
