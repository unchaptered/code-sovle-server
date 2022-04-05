import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TokenSort } from "../types/token.sort.enum";

/** UserModel 에 내장 문서의 형태로 저장됩니다.
 * 
 * @member token_sort 열거형으로 토큰의 종류를 나타내고 있습니다.
 * @member token_value 문자열로 토큰의 전체값(문장려)을 나타내고 있습니다.
 */
export default class {

    @IsEnum(TokenSort)
    token_sort: TokenSort;

    @IsString()
    @IsNotEmpty()
    token_value: string;

}