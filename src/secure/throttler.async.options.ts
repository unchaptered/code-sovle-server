import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerAsyncOptions } from '@nestjs/throttler';

/** Official Repo :  https://github.com/nestjs/throttler#usage
 */
export const throttlerAsyncOptions: ThrottlerAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (confgi: ConfigService) => ({
      ttl: +process.env.SECURE_THROTTLER_TTL,
      limit: +process.env.SECURE_THROTTLER_LIMIT
    })
};