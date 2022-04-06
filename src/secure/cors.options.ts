import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

const whitelist = 'https://code-qna-website-sveltekit.pages.dev/';

/**
 * origin 화이트리스트 체크
 * credentials 상호간 쿠키 공유 허용
 */
export const corsOption: CorsOptions = {
    origin: (origin, callback) =>
        ( whitelist === origin ) ?
            callback(null, true) :
            callback(new Error('Not Allowed Origin')),
    credentials: true
};