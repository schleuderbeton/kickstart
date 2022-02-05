import {Inject, Injectable} from '@nestjs/common';
import {ConfigType} from "@nestjs/config";
import {sendgridConfig} from "../config";


@Injectable()
export class SendgridConfigService {

	constructor(
		@Inject(sendgridConfig.KEY)
		private sendgrid: ConfigType<typeof sendgridConfig>
	) {

	}

	getRegistrationConfirmationTemplateId(locale?: string) {
		locale = locale || this.sendgrid.defaultTemplateLocale;
		return this.sendgrid.templateRegistrationConfirmation[locale];
	}
}
