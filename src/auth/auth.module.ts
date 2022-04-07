import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from 'src/user/user.module';
import { FormatModule } from 'src/format/format.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ ConfigModule, UserModule, FormatModule ],
  controllers: [ AuthController ],
  providers: [ AuthService ]
})
export class AuthModule {}
