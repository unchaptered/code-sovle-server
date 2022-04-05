import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

import * as config from 'config';

const dbConfig = config.get('database');

@Module({
  imports: [
    MongooseModule.forRoot(dbConfig.url || process.env.MONGO_URL ),
    ConfigModule.forRoot({
      envFilePath: ['default.yaml', 'development.yaml', 'deployment.yaml','test.yaml'],
      ignoreEnvFile:true
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
