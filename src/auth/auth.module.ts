import { Module } from '@nestjs/common';
import { JwtModule, } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';

import { JwtStrategy } from '../token/jwt.strategy';
import { jwtModuleAsyncOptions } from 'src/setting/jwt.async.options';

import { User, UserSchema } from 'src/schema/user.schema';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions),
    MongooseModule.forFeature([
        { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [ AuthController ],
  providers: [ AuthService, AuthRepository, JwtStrategy ]
})
export class AuthModule {}
