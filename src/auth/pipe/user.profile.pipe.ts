import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

import { emailRegex } from '../utility/utility';

@Injectable()
export default class UserProfileValidationPipe implements PipeTransform {

    transform(value: any) {

        const { email, password }= value;
        let emailValidated: Boolean, passwordValidated: Boolean = undefined;

        emailValidated = (email.match(emailRegex) !== null);
        passwordValidated = (password.length >= 8 && password.length <= 20);
        
        let message: Array<string> = [];
        if (!emailValidated) message.push(`This ${email} format is not valid`);
        if (!passwordValidated) message.push(`This ${password} format is not valid`);
        if (message.length >= 1) throw new BadRequestException(JSON.stringify(message));

        return value;

    }

}