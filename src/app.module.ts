import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { throttlerAsyncOptions } from './setting/throttler.async.options';

import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';
import { JwtStrategy } from './token/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleAsyncOptions } from './setting/jwt.async.options';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    MongooseModule.forRoot(process.env.ATLAS_URL),
    ThrottlerModule.forRootAsync(throttlerAsyncOptions),

    // Secure
    JwtStrategy,

    // Domain
    AuthModule, RoomModule, CardModule,

  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}