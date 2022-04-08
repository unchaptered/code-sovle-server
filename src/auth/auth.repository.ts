import { Model, Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/schema/user.shcmea';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import UserSort from './dto/user.sort.enum';
import UserProfileDto from './dto/user.profile.dto';
import UserProfileDetailDto from './dto/user.profile.detail.dto';

@Injectable()
export class AuthRepository {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectConnection() private mongoose: Connection
    ) {}

    async createAccount(userProfileDetailDto: UserProfileDetailDto): Promise<UserDocument> {
        return await this.userModel.create({...userProfileDetailDto});
    }
    /** 토큰 필요 */
    async deleteAccount(_id: string): Promise<UserDocument> {
        return await this.userModel.findByIdAndDelete(_id);
    }
    async createAccountToken(userProfileDto: UserProfileDto): Promise<UserDocument> {
        return await this.userModel.findOne({ ...userProfileDto }).select('sort username');
    }
    /** 토큰 필요 */
    async patchAccountSort(sort: UserSort, _id:string): Promise<UserDocument> {
        return await this.userModel.findByIdAndUpdate(_id, { sort }, { new: true }).select('sort username');
    }
    /** 토큰 필요 */
    async patchAccountUsername(username: string, _id: string): Promise<UserDocument> {
        return await this.userModel.findByIdAndUpdate(_id, { username }, { new: true }).select('sort username');
    }
}