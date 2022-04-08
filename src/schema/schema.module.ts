import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.shcmea';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: () => {
                    const userSchema = UserSchema;
                    userSchema.pre('save', function () {
                        console.log('hello');
                    })
                    return userSchema;
                }
            }
        ])
    ]
})
export class SchemaModule {}
