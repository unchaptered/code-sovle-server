import { Prop, Schema } from "@nestjs/mongoose";
import { IsBoolean, IsDate } from "class-validator"

/** UserModel 에 내장 문서의 형태로 저장됩니다.
 * 
 * @member isAuth 인증 여부를 나타내는 변수로 기본값은 false 입니다.
 * @member authDate 인증 날짜를 나타내는 변수로 기본값은 new Date() 입니다.
 */
@Schema()
export default class EmailAuthentication {

    @Prop({ type: Boolean, default: false, required: true })
    @IsBoolean()
    isAuth: Boolean = false;

    @Prop({ type:Date, default: new Date(), required: true})
    @IsDate()
    authDate?: Date = new Date();

    constructor(isAuth: Boolean, authDate: Date) {
        this.isAuth = isAuth;
        this.authDate = authDate;
    }

    set setIsAuth(updateIsAuth: Boolean) {
        this.isAuth = updateIsAuth;
    }
    get getIsAuth(): Boolean {
        return this.isAuth;
    }

    set setAuthDate(updateAuthDate: Date) {
        this.authDate = updateAuthDate;
    }
    get getAuthDate(): Date {
        return this.authDate;
    }
}

