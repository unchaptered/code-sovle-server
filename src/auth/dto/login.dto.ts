import { Prop, Schema } from "@nestjs/mongoose";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";


/** 
 * @member email 문자열로 유저의 이름을 타나냅니다.
 * 
 * @member password 문자열로 유저의 비밀번호를 타나냅니다.
 */
@Schema()
export default class LoginDto {

    @IsEmail()
    @Prop({ type:String, unique:true, required:true })
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Prop({ type:String, required:true, minlength:8, maxlength:20 })
    password: string;

}