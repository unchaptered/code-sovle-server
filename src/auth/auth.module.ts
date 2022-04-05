import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


/**
 * @AuthModule
 * 
 * @import MongooseModule.forFeatureAsync([]); // 참고용 메서드
 * @import MongooseModule.forFeature([]); // UserModel 생성
 * 
 * @AuthController mapping
 * @AuthService inejection
 */
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name:User.name, useFactory: () =>{
        const schema = UserSchema;
        schema.pre('save', function() { console.log('Hello I Saved! ')});
        return schema;
      }}
    ]),
    MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
