import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TokenSort } from "../types/token.sort.enum";

/** UserModel 에 내장 문서의 형태로 저장됩니다.
 * 
 * @member token_sort 열거형으로 토큰의 종류를 나타내고 있습니다.
 * @member token_value 문자열로 토큰의 전체값(문장려)을 나타내고 있습니다.
 */
export default class SnsConnection {

    @IsEnum(TokenSort)
    tokenSort: TokenSort;

    @IsString()
    @IsNotEmpty()
    tokenValue: string;

    constructor(tokenSort: TokenSort, tokenValue: string) {
        this.tokenSort = tokenSort;
        this.tokenValue = tokenValue;
    }

    set setTokenSort(tokenSort: TokenSort) {
        this.tokenSort = tokenSort;
    }
    get getTokenSort(): TokenSort {
        return this.tokenSort;
    }

    set setTokenValue(tokenValue: string) {
        this.tokenValue = tokenValue;
    }
    get getTokenValue():string {
        return this.tokenValue;
    }

}