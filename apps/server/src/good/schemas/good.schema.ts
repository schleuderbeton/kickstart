import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type GoodDocument = Good & Document;

@Schema()
export class Good {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    kind: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    unit: string;

    @Prop({ required: true })
    freezeDate: Date;

    @Prop({ required: true })
    bestBeforeDate: Date;

    @Prop({ required: true })
    location: string;

    @Prop()
    origin: string;

    @Prop()
    description: string;

    @Prop()
    tags: string[];

    @Prop()
    deletedAt?: Date;
}

export const GoodSchema = SchemaFactory.createForClass(Good);
