import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export default class DescriptionValidationPipe implements PipeTransform {

    transform(value: any) {

        const descriptionLength: number = value.length;

        let descriptionValidated: Boolean = descriptionLength <= 300;

        let message: Array<string> = [];
        if (!descriptionValidated) message.push(`This description format is not valid`);
        if (message.length >= 1) throw new BadRequestException(JSON.stringify(message));

        return value;

    }
}