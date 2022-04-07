import { Schema } from "@nestjs/mongoose";
import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Max } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

import UserProfileDto from "./user.profile.dto";

@Schema()
export default class UserProfileDetailDto extends PartialType(UserProfileDto) {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    username:string;

    constructor({ email, password, username }) {
        super({email, password});
        this.username = username;
    }

    set setUsername(username: string) {
        this.username = username;
    }

    get getUsername(): string {
        return this.username;
    }

}