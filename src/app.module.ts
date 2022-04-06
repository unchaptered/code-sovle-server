import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

import * as config from 'config';

const dbConfig = config.get('database');

@Module({
  imports: [
    MongooseModule.forRoot( process.env.ATLAS_URL ),
    // process.env.NODE_ENV 가 dev, test 일 경우는 환경변수 셋팅
    // process.env.NODE_ENV 가 prod 일 경우는 환경변수 재셋팅
    // 위 세 경우의 DB 경로가 다 다름
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: ( process.env.NODE_ENV === 'dev' ) ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
