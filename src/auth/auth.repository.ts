import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from 'src/schema/user.schema';

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
        const user = await this.userModel.findOne({ ...userProfileDto }).select('sort username');
        if (user === null) throw new NotFoundException('No User');
        
        return user;
    }
    /** 토큰 필요 */
    async patchAccountSort(sort: UserSort, _id:string): Promise<UserDocument> {
        return await this.userModel.findByIdAndUpdate(_id, { sort }, { new: true }).select('sort username');
    }
    /** 토큰 필요 */
    async patchAccountUsername(username: string, _id: string): Promise<UserDocument> {
        return await this.userModel.findByIdAndUpdate(_id, { username }, { new: true }).select('sort username');
    }
    /** 토큰 필요 */
    async patchAccountDescription(description: string, _id: string): Promise<UserDocument> {
        return await this.userModel.findByIdAndUpdate(_id, { description }, { new:true }).select('sort username');
    }

    async getAccountByEmail(email: string): Promise<UserDocument> {
        const user = await this.userModel.findOne({ email });
        if (user === null) throw new NotFoundException('No User');

        return user;
    }

    async getAccountByUsername(username: string): Promise<UserDocument[]> {
        const regex=new RegExp("(.*)"+username+"(.*)");
        const users = await this.userModel.find({ username: { $regex:regex }}).limit(30);
        if (users.length === 0) throw new NotFoundException('No User');

        return users;
    }

    async getAccountProfile(_id: string): Promise<UserDocument> {
        const user =  await this.userModel.findById(_id).select('sort username description');
        if (user === null) throw new NotFoundException('No User');
        
        return user;
    }
}