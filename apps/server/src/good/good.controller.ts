import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {GoodService} from "./good.service";
import {UpdateGoodDto} from "./dto/update-good.dto";
import {CreateGoodDto} from "./dto/create-good.dto";

@Controller('goods')
export class GoodController {
    constructor(private readonly service: GoodService) {
    }

    @Get()
    async index() {
        return await this.service.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Post()
    async create(@Body() createGoodDto: CreateGoodDto) {
        return await this.service.create(createGoodDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateGoodDto: UpdateGoodDto) {
        return await this.service.update(id, updateGoodDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(id);
    }
}
