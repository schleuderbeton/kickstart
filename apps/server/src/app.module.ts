import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "./config/config.module";
import {join} from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
import {MongooseModule} from "@nestjs/mongoose";
import {DatabaseConfigService} from "./config/services/database.config.service";
import { TodoModule } from './todo/todo.module';
import {GoodModule} from "./good/good.module";

@Module({
  imports: [
      ConfigModule,
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, "../client"),
      }),
	  MongooseModule.forRootAsync({
		  inject: [DatabaseConfigService],
		  useFactory: async (configService: DatabaseConfigService) => ({
			  uri: configService.getDatabaseUrl()
		  })
	  }),
      TodoModule,
      GoodModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
