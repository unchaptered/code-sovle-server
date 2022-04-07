import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { throttlerAsyncOptions } from './secure/throttler.async.options';
import { RoomModule } from './room/room.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    MongooseModule.forRoot(process.env.ATLAS_URL),
    ThrottlerModule.forRootAsync(throttlerAsyncOptions),

    AuthModule, UserModule, RoomModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}