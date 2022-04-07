import { Schema } from "@nestjs/mongoose";
import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from "class-validator";

@Schema()
export default class UserProfileDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    constructor({email, password}) {
        this.email = email;
        this.password = password;
    }

    set setEmail(email: string) {
        this.email = email;
    }
    get getEmail(): string {
        return this.email;
    }
    
    set setPassword(password: string) {
        this.password = password;
    }
    get getPassword(): string {
        return this.password;
    }

}