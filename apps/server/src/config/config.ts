import {registerAs} from "@nestjs/config";
import {HttpsProxyAgent} from "https-proxy-agent";
import {HttpModuleOptions} from "@nestjs/common";

export const appConfig = registerAs('app', () => ({
    environment: process.env.ENVIRONMENT,
    name: process.env.APP_NAME || process.env.npm_package_name,
    version: process.env.APP_VERSION || process.env.npm_package_version,
    urlWebapp: process.env.URL_WEBAPP || "http://localhost:8080"
}));

export const axiosConfig = registerAs("axios", (): HttpModuleOptions => ({
    httpAgent: process.env.HTTP_PROXY ? new HttpsProxyAgent(process.env.HTTP_PROXY) : undefined,
    httpsAgent: process.env.HTTPS_PROXY ? new HttpsProxyAgent(process.env.HTTPS_PROXY) : undefined,
    proxy: (process.env.HTTP_PROXY || process.env.HTTPS_PROXY) && false
}));

export const databaseConfig = registerAs('database', () => ({
    serviceHost: process.env.MONGODB_SERVICE_HOST,
    servicePort: process.env.MONGODB_SERVICE_PORT_MONGODB,
    supplierDatabaseName: process.env.MONGODB_DATABASE,
    username: process.env.MONGODB_USERNAME || null,
    password: process.env.MONGODB_PASSWORD || null,
    authSource: process.env.MONGODB_DATABASE
}));

export const sendgridConfig = registerAs('sendgrid', () => ({
    defaultTemplateLocale: "en",
    templateRegistrationConfirmation: {
        en: "d-00cc5b659c5845619151e8c2bb7fbc28",
        de: "d-00cc5b659c5845619151e8c2bb7fbc28"
    }
}));


/*
Need to define constants in file? Environment variables or .env file aren't suitable?
Try using yaml file:

const YAML_CONFIG_FILENAME = 'config.yaml';
const configYaml = yaml.load(
	fs.readFileSync(join(/!*__dirname, *!/YAML_CONFIG_FILENAME), 'utf8'),
);

export const yamlConfig = registerAs('test', () => ({
	sub: configYaml.obj.sub || "local sub",
	port2: configYaml.obj.port || 1234
}));*/
