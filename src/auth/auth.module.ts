import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtModule, } from '@nestjs/jwt';
import { JwtStrategy } from '../token/jwt.strategy';
import { jwtModuleAsyncOptions } from 'src/setting/jwt.async.options';
import { AuthRepository } from './auth.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.shcmea';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions),
    MongooseModule.forFeature([
        { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [ AuthController ],
  providers: [ AuthService, AuthRepository, JwtStrategy ],
})
export class AuthModule {}
