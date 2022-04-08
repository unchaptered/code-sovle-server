import { Model } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { User, UserDocument } from "src/schema/user.shcmea";

import UserSort from "./dto/user.sort.enum";
import UserProfileDto from "./dto/user.profile.dto";
import UserProfileDetailDto from "./dto/user.profile.detail.dto";

import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private authRepository: AuthRepository,
        private jwtService: JwtService
    ) {}

    async createAccount(userProfileDetailDto: UserProfileDetailDto): Promise<UserDocument> {
        return this.authRepository.createAccount(userProfileDetailDto);
    }
    async deleteAccount(bearerToken: string): Promise<UserDocument> {
        const user: any = this.jwtService.decode(bearerToken);
        return this.authRepository.deleteAccount(user._id);
    }
    async createAccountToken(userProfileDto: UserProfileDto): Promise<Object> {
        const result = await this.authRepository.createAccountToken(userProfileDto);

        const { _id, sort, username } = result;
        const jwtToken = this.jwtService.sign({ _id, sort, username });
        
        return { _id, sort, username, jwtToken }
    }
    
    async patchAccountSort(sort: UserSort, bearerToken: string): Promise<Object> {

        const user: any = this.jwtService.decode(bearerToken);
        
        const result = await this.authRepository.patchAccountSort(sort, user._id);
        const { _id, sort: sortVal, username } = result;
        return { _id, sort:sortVal, username };
    }
    async patchAccountUsername(username: string, bearerToken: string): Promise<Object> {    

        const user: any = this.jwtService.decode(bearerToken);

        const result = await this.authRepository.patchAccountUsername(username, user._id);
        const { _id, sort, username:usernameVal } = result;
        return { _id, sort, username:usernameVal };
    }

    async test() {
    }
}