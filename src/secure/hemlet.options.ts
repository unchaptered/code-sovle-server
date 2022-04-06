import { HelmetOptions } from 'helmet';

/**
 * Offitial Repo https://github.com/helmetjs/helmet
 * 
 * **WATCH VIDEO**
 * 
 * 웹개발 짜증유발자! CORS가 뭔가요? https://youtu.be/bW31xiNB8Nc
 * 
 * **READ MDN ARTICLE**
 * 
 * crossOriginEmbedderPolicy https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy
 * crossOriginOpenerPolicy https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy
 * crossOriginResourcePolicy https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy
 */
export const helmetOptions: HelmetOptions = {
    // crossOriginEmbedderPolicy: true,
    // crossOriginOpenerPolicy: { policy: 'unsafe-none' },
    // crossOriginResourcePolicy: { policy: 'cross-origin' },
}