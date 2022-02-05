import {Expose} from 'class-transformer';

export class ClientConfig {

	@Expose()
	env: string;

	@Expose()
	name: string;

	@Expose()
	version: string;

	@Expose()
	appUrl: string;

}
