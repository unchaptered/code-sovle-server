import { Model, Connection } from 'mongoose';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from './schema/user.schema';

import JoinDto from './dto/join.dto';
import LoginDto from './dto/login.dto';
import UserProfile from './classes/user.profile';

import UserSort from './types/user.sort.enum';
import UserProfileDetailDto from 'src/auth/dto/user.profile.detail.dto';
import UserProfileDto from 'src/auth/dto/user.profile.dto';

/**
 * 
 */
@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectConnection() private mongoose: Connection
    ) {}

    /**
     * Mongoose 를 이용해서 회원가입을 하며, 해당 객체를 Spread 구문으로 파괴하고 특정 정보만을 리턴합니다.
     * 
     * @param sort 열거형 UserSort
     * @param joinDto 클래스 JoinDto
     * @returns Promise<UserProfile\>
     */
    async join(sort:UserSort, joinDto: JoinDto): Promise<UserProfile> {
        const userDB = await this.userModel.create({...joinDto, sort});
        return new UserProfile(userDB);
    }

    /**
     * Mongoose 를 이용해서 로그인을 하며, 해당 객체를 Spread 구문으로 파괴하고 특정 정보만을 리턴합니다.
     * 
     * @param sort 열거형 UserSort
     * @param loginDto 클래스 LoginDto
     * @returns Promise<UserProfile\>
     */
    async login(sort:UserSort, loginDto: LoginDto): Promise<UserProfile> {
        const { email, password } = loginDto;
        const userDB = await this.userModel.findOne({ email, password });
        if (userDB === null) throw new NotFoundException(`The ${email} isn't exists`);

        return new UserProfile(userDB);
    }

    /**
     * Mongoose 를 통해서 아이디를 찾고 이를 true(못참음/아이디 생성 가능) 와 false(아이지 찾음/아이디 생성 불가) 로 반환합니다.
     * 
     * @param email 문자열
     * @returns Promise<Boolean\>
     */
    async findUserByEmail(email: string): Promise<Boolean> {
        const isPossibleCreateUser = await this.userModel.exists({ email }) === null;
        return isPossibleCreateUser;
    }

    /**
     * sort 배열의 길이가 0이면 limit 을 테스트하며
     * 
     * sort 배열의 길이가 0이 아니면, 순회하여 ADMIN 을 제외하고 정규식을 만들고 limit 을 테스트합니다.
     * 
     * limit 가공 결과로는 1 ~ 30 사이의 숫자가 완성됩니다.
     * 
     * @param sorts 길이 0부터 2까지의 배열
     * @param limit 길이 1부터 30까지의 숫자
     * @returns Promise<UserProfile[]\>
     */
    async getAllUserByOptions(sorts:UserSort[] = [], limit:number = 30): Promise<UserProfile[]> {
        const limitFinal = Math.max(Math.min(limit, 30), 1);

        let users = [];
        if (sorts.length == 0) {

            const usersDB = await this.userModel.find().limit(limit).select('sort username');
            users = usersDB.map(val => new UserProfile(val));

        } else {

            // UserSort 중 ADMIN 을 제외하고 최대 2개의 값을 잡아서 이를 검사합니다.
            const sortRegex = new RegExp(
                sorts.map(val => `(${val.toUpperCase() === UserSort.ADMIN ? '' : val.toUpperCase()})`)
                    .join('|')
                , 'g')
            const usersDB = await this.userModel.find({ sort: sortRegex }).limit(limit).select('sort username');
            users = usersDB.map(val => new UserProfile(val));

        }

        return users;
    }

    async createAccount(userProfileDetailDto: UserProfileDetailDto): Promise<UserDocument> {
        return await this.userModel.create({...userProfileDetailDto});
    }
    async deleteAccount(userProfileDto: UserProfileDto): Promise<UserDocument> {
        return await this.userModel.findOneAndDelete({ ...userProfileDto });
    }
    async createAccountToken(userProfileDto: UserProfileDto): Promise<UserDocument> {
        return await this.userModel.findOne({ ...userProfileDto });
    }

    async patchAccountSort(sort: UserSort, userProfileDto: UserProfileDto) {
        return await this.userModel.findOneAndUpdate({ ...userProfileDto }, { sort });
    }
    async patchAccountUsername(username: string, userProfileDto: UserProfileDto){
        return await this.userModel.findOneAndUpdate({ ...userProfileDto }, { username });  
    }
}