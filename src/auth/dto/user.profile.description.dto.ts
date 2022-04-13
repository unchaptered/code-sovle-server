import { Schema } from "@nestjs/mongoose";
import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Max } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

import UserProfileDetailDto from "./user.profile.detail.dto";

@Schema()
export default class UserProfileDescriptionDto extends PartialType(UserProfileDetailDto) {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    description:string;

    constructor({ email, password, username, description}) {
        super({email, password, username});
        this.description = description;
    }

    set setDescription(description: string) {
        this.description = description;
    }

    get getDescription(): string {
        return this.description;
    }

}