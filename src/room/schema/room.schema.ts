import { ObjectId, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';

import InviteCard from '../classes/invite.card.class';
import ApplyCard from '../classes/apply.card.class';
import PostOrigin from '../classes/post.origin.class';


@Schema()
export class Room {

    @Prop({ type:String, required:true })
    title: string;

    @Prop({ type:String, required:true })
    subTitle: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, required:true, ref:"User" })
    owner: ObjectId;

    constructor(title: string, subTitle: string, owner: ObjectId) {

        this.title = title;
        this.subTitle = subTitle;
        this.owner = owner;

    }

    @Prop([InviteCard])
    @IsOptional()
    inviteCards?: InviteCard[];
    
    @Prop([ApplyCard])
    @IsOptional()
    applyCards?: ApplyCard[];

    @Prop([PostOrigin])
    posts?: PostOrigin[];

};
