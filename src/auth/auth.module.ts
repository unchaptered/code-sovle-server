import { Module } from '@nestjs/common';

import { UserModule } from 'src/user/user.module';
import { FormatModule } from 'src/format/format.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ UserModule, FormatModule ],
  controllers: [ AuthController ],
  providers: [ AuthService ]
})
export class AuthModule {}
