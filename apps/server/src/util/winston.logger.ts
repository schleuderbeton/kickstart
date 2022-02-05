import {format, transports} from "winston";
import * as DailyRotateFile from "winston-daily-rotate-file";
import {ConsoleTransportInstance} from "winston/lib/winston/transports";
import * as fs from "fs";
import {WinstonModule} from "nest-winston";
import {LoggerService} from "@nestjs/common";

const reservedKeys = [
	'level',
	'log',
	'stack',
	'ecs',
	'@timestamp',
	'message',
	'req',
	'request',
	'res',
	'response'
];

const containerInfo = {
	// image: {name: process.env.DOCKER_CUSTOM_IMAGE_NAME || "define image name if needed"},
	// name: constants.APP_NAME
};

class EcsFormatter {
	transform (log) {
		const ecs:any = {
			'@timestamp': new Date().toISOString(),
			/*log: {
				level: log.level,
				logger: 'winston'
			},*/
			logger: 'winston',
			level: log.level,
			message: log.message,
			// container: containerInfo
		};

		if (log.stack) {
			ecs.stack = log.stack;
		}

		const meta = {};
		const keys = Object.keys(log).filter(key => reservedKeys.indexOf(key) === -1);
		if(keys.length > 0){
			for (let key of keys) {
				meta[key] = log[key];
			}
			ecs.meta = meta;
		}

		log[Symbol.for('message')] = JSON.stringify(ecs);
		return log;
	}
}

export function consoleTransport():ConsoleTransportInstance{
	const formats = [
		// format.errors({stack: true}),
		format.timestamp(),
		format.metadata(),
		format.printf(({level, message, metadata}) => {
			let {context, timestamp, stack, ...meta} = metadata;
			let formatted = `${timestamp} ${level}`;
			if (stack && stack.join().length > 0) {
				return `${formatted}: ${stack}`;
			}
			if (context) {
				formatted = `${formatted}: ${context}`;
			}
			if (Object.keys(meta).length === 0) {
				return `${formatted}: ${message}`;
			}
			return `${formatted}: ${message} \n${JSON.stringify(meta)}`;
		})
	];
	if (process.env.NODE_ENV === "production") {
		formats.push(new EcsFormatter());
	} else {
		formats.unshift(format.colorize());
	}

	return new transports.Console({
		format: format.combine(...formats)
	});
}

export function dailyRotateFileTransport():DailyRotateFile{
	const transport = new DailyRotateFile({
		filename: `${process.env.PATH_APP_VOLUME || "."}/logs/app_%DATE%.log`,
		datePattern: 'YYYY-MM-DD',
		maxFiles: 30,
		utc: true,
		// format: new EcsFormatter()
	});

	//set manually modified/access timestamp to current log file to fix azure smb integration
	//smb client (like filebeat at beaker) won't notice any changes on log files without this fix
	/*let currentLogFile;
	transport.on("new", newFilename =>{
		currentLogFile = newFilename;
	});
	transport.on("logged", log => {
		if (currentLogFile) {
			const now = new Date();
			fs.utimes(currentLogFile, now, now, error => {
				if (error) {
					console.log('Error on setting mod/access timestamp on log file');
				}
			});
		}
	});*/

	return transport;
}

export function createLogger():LoggerService{
	const logger = WinstonModule.createLogger({
		level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
		// format: format.errors({stack: true}),
		transports: [
			consoleTransport(),
			dailyRotateFileTransport()
		]
	});

	process.on('uncaughtException', (e:Error) => {
		logger.error(e);
	});
	process.on('unhandledRejection', (e:Error) => {
		logger.error(e);
	});

	return logger;
}
