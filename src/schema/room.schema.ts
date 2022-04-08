import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import UserSort from 'src/auth/dto/user.sort.enum';

@Schema({ timestamps: true })
export class Room {

    // oriign options

    @Prop({ type:String, required:true })
    title: string;

    // Owner Information Denomalize

    @Prop({ type:String, ref: 'User'})
    ownerId: string;

    @Prop({ type:String, minlength:3, maxlength:20})
    ownerName: string;

    @Prop({ type:String, maxlength:300})
    ownerDescription?: string;

    // Members Informations

    // 보낸 초대장 (오너가 신청, 일반 멤버들이 신청), 안에는 _id 들어있음
    @Prop([{ type:mongoose.Types.ObjectId, ref:'User'}])
    requestInviteCardList?: string[];
    @Prop([String])
    requestInviteNameList?: string[]; // 신청자 명단

    // 후순위 개발항목

    // 받은 입장권 (오너가 수락 가능, 일반 멤버들이 신청), 안에는 _id 들어있음
    // @Prop([{ type:mongoose.Types.ObjectId, ref:'User'}])
    // responsePassCardList?: string[];
    // @Prop([String])
    // responsePassNameList?: string[]; // 대기자 명단

}
export type RoomDocument = Room & Document & { _id:Object };
export const RoomSchema = SchemaFactory.createForClass(Room);