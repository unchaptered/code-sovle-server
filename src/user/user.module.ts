import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

import { UserController } from './user.controller';
import { UserService } from './user.service';


/**
 * @AuthModule
 * 
 * @import MongooseModule.forFeatureAsync([]); // 참고용 메서드
 * @import MongooseModule.forFeature([]); // UserModel 생성
 * 
 * @AuthController mapping
 * @UserService inejection
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
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
