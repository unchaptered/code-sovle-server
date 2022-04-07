import { Injectable } from "@nestjs/common";
import { UserDocument } from "src/user/schema/user.schema";
import { UserService } from "src/user/user.service";
import UserProfileDetailDto from "./dto/user.profile.detail.dto";
import UserProfileDto from "./dto/user.profile.dto";
import UserSort from "./dto/user.sort.enum";

@Injectable()
export class AuthService {

    constructor(private userService: UserService) {}

    async createAccount(userProfileDetailDto: UserProfileDetailDto): Promise<UserDocument> {
        return this.userService.createAccount(userProfileDetailDto);
    }
    async deleteAccount(userProfileDto: UserProfileDto): Promise<UserDocument> {
        return this.userService.deleteAccount(userProfileDto);
    }
    async createAccountToken(userProfileDto: UserProfileDto): Promise<UserDocument> {
        return this.userService.createAccountToken(userProfileDto);
    }
    
    async patchAccountSort(sort: UserSort, userProfileDto: UserProfileDto) {
        return this.userService.patchAccountSort(sort, userProfileDto);
    }
    async patchAccountUsername(username: string, userProfileDto: UserProfileDto) {    
        return this.userService.patchAccountUsername(username, userProfileDto);
    }
}