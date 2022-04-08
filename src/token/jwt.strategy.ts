import { Injectable } from "@nestjs/common";

import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECURE_JWT_TOKEN_SECRET,
            ignoreExpiration: false
        })
    }

    async validate(payload: any) {
        return { _id:payload._id, sort:payload.sort, username:payload.username }
    }

}


// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor() {
//       super({
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         ignoreExpiration: false,
//         secretOrKey: jwtConstants.secret,
//       });
//     }
// }