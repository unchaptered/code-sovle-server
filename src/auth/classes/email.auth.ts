import { IsBoolean, IsDate } from "class-validator"

/** UserModel 에 내장 문서의 형태로 저장됩니다.
 * 
 * @member isAuth 인증 여부를 나타내는 변수로 기본값은 false 입니다.
 * @member authDate 인증 날짜를 나타내는 변수로 기본값은 new Date() 입니다.
 */
export default class {

    @IsBoolean()
    isAuth: Boolean = false;

    @IsDate()
    authDate?: Date = new Date();
    
}