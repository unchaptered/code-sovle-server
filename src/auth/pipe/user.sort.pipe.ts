import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserSort } from '../types/user.sort.enum';


/**
 * @readonly UserSortArray 열거형 UserSort 를 배열의 형태로 전환시켰습니다.
 * 
 * @function transform 입력값을 열거형과 동일하게 대문자로 변환했습니다.
 * 
 * @function isExsistentUserSort UserSortArray 에서 동일한 문자열을 찾고 Boolean(기댓값:true)을 반환합니다.
 */
@Injectable()
export default class UserSortValidatioPipe implements PipeTransform {

    readonly UserSortArray = [
        UserSort.ADMIN,
        UserSort.MENTO,
        UserSort.MENTEE
    ]

    // transform(value: any, metadata: ArgumentMetadata) {}
    transform(value: any): string {
        
        value = (""+value).toUpperCase();
        if (this.isExsistentUserSort(value)) {
            throw new BadRequestException(`${value} isnt' in the UserSort options`);
        }

        return value;

    }

    private isExsistentUserSort(userSort: any): Boolean {

        const index = this.UserSortArray.indexOf(userSort);
        return index === -1;

    }

    
}