import { ObjectId, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

@Schema()
export default class Card {

    @Prop({ type: MongooseSchema.Types.ObjectId, ref:"User", required:true })
    @IsString()
    @IsNotEmpty()
    owner: ObjectId;

    created: Date;

    constructor(owner: ObjectId) {
        this.owner = owner;
        this.created = new Date();
    }

}