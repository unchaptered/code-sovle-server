import { Model } from 'mongoose';
import { JwtService } from "@nestjs/jwt";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { AuthRepository } from './auth.repository';

import { User, UserDocument } from "src/schema/user.schema";

import UserSort from "./dto/user.sort.enum";
import UserProfileDto from "./dto/user.profile.dto";
import UserProfileDetailDto from "./dto/user.profile.detail.dto";

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
    
    async patchAccountDescription(description: string, bearerToken: string): Promise<Object> {

        const user: any = this.jwtService.decode(bearerToken);

        const result = await this.authRepository.patchAccountDescription(description, user._id);
        const { _id, sort, username:usernameVal } = result;
        return { _id, sort, username:usernameVal };
        
    }
    async getAccountByQuery(email: string, username: string) {
        if (email !== undefined) {
            return this.getAccountByEmail(email);
        } else if (username !== undefined) {
            return this.getAccountByUsername(username);
        } else {
            throw new BadRequestException('You must give us any email or username');
        }
    }
    async getAccountByEmail(email: string) {
        return this.authRepository.getAccountByEmail(email);
    }
    async getAccountByUsername(username: string) {
        return this.authRepository.getAccountByUsername(username);
    }

    async getAccountProfile(_id:string): Promise<Object> {
        const result =  this.authRepository.getAccountProfile(_id);

        return result;
        
    }

}