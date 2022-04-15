import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepository } from './room.repository';

import { Room, RoomSchema } from 'src/schema/room.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { jwtModuleAsyncOptions } from 'src/setting/jwt.async.options';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Room.name, schema: RoomSchema }
    ]),
  ],
  controllers: [  RoomController ],
  providers: [ RoomService, RoomRepository ]
})
export class RoomModule {}
