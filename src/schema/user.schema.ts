import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import UserSort from '../auth/dto/user.sort.enum';


@Schema({ timestamps: true })
export class User {

    // origin options

    @Prop({ type:String, enum:[ UserSort.ADMIN, UserSort.MENTEE, UserSort.MENTO ],
        default:UserSort.MENTEE, required:true })
    sort: UserSort;

    @Prop({ type:String, unique:true, required:true })
    email: string;

    @Prop({ type:String, required:true, minlength:3, maxlength:20 })
    username: string;

    @Prop({ type:String, required:true, minlength:8, maxlength:20 })
    password: string;

    @Prop({ type:String, default:'', required:false, maxlength:300 })
    description: string;

    @Prop([{ type:mongoose.Types.ObjectId, ref:'Room'}])
    roomList: string[];

    @Prop([{ type:mongoose.Types.ObjectId, ref:'Room' }])
    invitedCardList: string[];

    // @Prop([{ type:String }])
    // invitedNameList: string[];
    
}
export type UserDocument = User & Document & { _id:Object };
export const UserSchema = SchemaFactory.createForClass(User);