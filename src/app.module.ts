import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

import * as config from 'config';

const dbConfig = config.get('database');

@Module({
  imports: [
    MongooseModule.forRoot(dbConfig.url),
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
