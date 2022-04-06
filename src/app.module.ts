import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    MongooseModule.forRoot(process.env.ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 0.01, limit: 10
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
