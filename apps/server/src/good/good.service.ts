import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateGoodDto} from "./dto/create-good.dto";
import {UpdateGoodDto} from "./dto/update-good.dto";
import {Good, GoodDocument} from "./schemas/good.schema";

@Injectable()
export class GoodService {
    constructor(@InjectModel(Good.name) private readonly model: Model<GoodDocument>) {

    }

    async findAll(): Promise<Good[]> {
        return await this.model.find().exec();
    }

    async findOne(id: string): Promise<Good> {
        return await this.model.findById(id).exec();
    }

    async create(createGoodDto: CreateGoodDto): Promise<Good> {
        return await new this.model({
            ...createGoodDto,
            freezeDate: new Date(),
        }).save();
    }

    async update(id: string, updateGoodDto: UpdateGoodDto): Promise<Good> {
        return await this.model.findByIdAndUpdate(id, updateGoodDto).exec();
    }

    async delete(id: string): Promise<Good> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
