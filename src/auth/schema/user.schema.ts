import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { UserSort } from '../types/user.sort.enum';

import SnsConnection from '../classes/sns.connection';

import EmailAuthentication from '../classes/email.auth';
import { IsOptional } from 'class-validator';
import JoinDto from '../dto/join.dto';

/**
 * @member sort 열거형으로 유저의 이름을 나타냅니다.
 * 
 * @options id_connections 해당 계정으로 접속된 IP 리스트 입니다.
 * 
 * @options sns_connections 해당 계정으로 접속한 SNS O-Auth 토큰들 입니다.
 * 
 * @options email_authentication 해당 계정으로 이메일 인증을 했는지 여부와 그 갱신일입니다.
 * 
 * 
 * @extends JoinDto (1 개의 멤버변수 상속)
 * 
 * @member username 문자열로 유저의 이름을 나타내고 있습니다.
 * 
 * @extends LoginDto (2개의 멤버 변수 상속)
 * 
 * @member email 문자열로 유저의 이메일을 타나냅니다.
 * 
 * @member password 문자열로 유저의 이름을 타나냅니다.
 */
@Schema({ timestamps:true })
export class User extends JoinDto {
    
    // 기본값 설정
    @Prop({ type:String, required:true})
    sort: UserSort;

    // DTO 에서 email, username, password 를 받아옴

    // 선택값

    @Prop([String])
    @IsOptional()
    ip_connections?: string[];

    @Prop([SnsConnection])
    @IsOptional()
    sns_connections?: SnsConnection[];

    @Prop([EmailAuthentication])
    @IsOptional()
    email_authentication?: EmailAuthentication[];
    
}

export type UserDocument = User & Document;

/**
 * 아래 내용으로 스키마를 만들어냅니다.
 * 
 * 모델을 만드는 부분은 auth.module.ts 에 존재합니다.
 * 
 * @Schema LoginDto
 * @Schema JoinDto
 * @Schema User
 */
export const UserSchema = SchemaFactory.createForClass(User);