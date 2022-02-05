import { Module } from '@nestjs/common';
import { GoodService } from './good.service';
import { GoodController } from './good.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Good, GoodSchema} from "./schemas/good.schema";

@Module({
  imports: [
      MongooseModule.forFeature([
        {name:Good.name, schema: GoodSchema}
      ])
  ],
  providers: [GoodService],
  controllers: [GoodController]
})
export class GoodModule {}
