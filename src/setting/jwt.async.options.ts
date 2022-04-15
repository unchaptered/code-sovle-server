import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const jwtModuleAsyncOptions: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => ({
        secret: process.env.SECURE_JWT_TOKEN_SECRET,
        signOptions: { expiresIn: process.env.SECURE_JWT_TOKEN_EXPIRE }
    })
};