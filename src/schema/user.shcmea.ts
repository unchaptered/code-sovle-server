import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import UserSort from "src/auth/dto/user.sort.enum";



@Schema({ timestamps: true })
export class User {

    @Prop({ type:String, enum:[ UserSort.ADMIN, UserSort.MENTEE, UserSort.MENTO ],
        default:UserSort.MENTEE ,required:true })
    sort: UserSort;

    @Prop({ type:String, unique:true, required:true })
    email: string;

    @Prop({ type:String, required:true, minlength:3, maxlength:20 })
    username: string;

    @Prop({ type:String, required:true, minlength:8, maxlength:20 })
    password: string;
    
}

export type UserDocument = User & Document & { _id:Object };
export const UserSchema = SchemaFactory.createForClass(User);