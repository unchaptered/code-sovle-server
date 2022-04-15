import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/token/jwt.strategy';

import { Room, RoomSchema } from '../schema/room.schema';
import { User, UserSchema } from '../schema/user.schema';
import { jwtModuleAsyncOptions } from '../setting/jwt.async.options';
import { CardController } from './card.controller';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync(jwtModuleAsyncOptions),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Room.name, schema: RoomSchema }
        ])
    ],
    controllers: [ CardController ],
    providers: [ JwtStrategy ]
})
export class CardModule {}
