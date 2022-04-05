import { Prop, Schema } from "@nestjs/mongoose";
import { IsEmail, IsString } from "class-validator";


/** 
 * @member email 문자열로 유저의 이름을 타나냅니다.
 * 
 * @member password 문자열로 유저의 비밀번호를 타나냅니다.
 */
@Schema()
export class LoginDto {

    @IsEmail()
    @Prop({ type:String, unique:true, required:true })
    email: string;

    @IsString()
    @Prop({ type:String, required:true })
    password: string;

}

export default LoginDto;