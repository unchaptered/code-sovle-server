import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export default class UsernameValidationPipe implements PipeTransform {

    transform(value: any) {

        console.log(value);
        const usernameLength: number = value.length;

        let usernameValidated: Boolean =  usernameLength >= 3 && usernameLength <= 20;

        let message: Array<string> = [];
        if (!usernameValidated) message.push(`This ${message} format is not valid`);
        if (message.length >= 1) throw new BadRequestException(JSON.stringify(message));

        return value;

    }
}