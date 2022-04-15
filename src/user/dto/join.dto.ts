import { Prop, Schema } from "@nestjs/mongoose";
import { IsString, MaxLength, MinLength } from "class-validator";

import LoginDto from './login.dto';

/** 
 * @member username 문자열로 유저의 이름을 나타내고 있습니다.
 * 
 * @extends LoginDto (2개의 멤버 변수 상속)
 * 
 * @member email 문자열로 유저의 이메일 타나냅니다.
 * 
 * @member password 문자열로 유저의 비밀번호를 타나냅니다.
 */
@Schema()
export default class JoinDto extends LoginDto {
    
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @Prop({ type:String, required:true, minlength:3, maxlength:20 })
    username: string;

}

