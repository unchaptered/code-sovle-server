import {
    Controller, Get, Post, Patch, Delete,
    Body, Logger, Query, UseGuards, Headers, Param
} from '@nestjs/common';

// dependency inejection

import { AuthService } from './auth.service';

// dto

import UserSort from './dto/user.sort.enum';
import UserProfileDto from './dto/user.profile.dto';
import UserProfileDetailDto from './dto/user.profile.detail.dto';

// docs

import { UserDocument } from 'src/user/schema/user.schema';

// pipe

import UserSortValidatioPipe from './pipe/user.sort.pipe';
import UsernameValidationPipe from './pipe/user.name.pipe';
import UserProfileValidationPipe from './pipe/user.profile.pipe';
import UserProfileDetailValidationPipe from './pipe/user.profile.detail.pipe';

import { JwtGuard } from '../token/jwt.guard';
import { ConfigService } from '@nestjs/config';

// guard

import { extractTokenFromBearer } from 'src/token/jwt.extract';
import { ThrottlerGuard } from '@nestjs/throttler';
import DescriptionValidationPipe from './pipe/user.description.pipe';

@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {

    private authLogger: Logger = new Logger('AuthController');

    constructor( private authService: AuthService, private configService: ConfigService ) {}

    @Get('/')
    getApiDocs() {
        return 'hello';
    }

    @Post('/account')
    createAccount( @Body(UserProfileDetailValidationPipe) userProfileDetailDto: UserProfileDetailDto ): Promise<UserDocument> {

        this.authLogger.log(`createAccount ${JSON.stringify(userProfileDetailDto)}`);
        return this.authService.createAccount(userProfileDetailDto);

    }

    @UseGuards(JwtGuard)
    @Delete('/account')
    deleteAccount( @Headers('authorization') bearerToken: Object ): Object {

        const token = extractTokenFromBearer(bearerToken);
        this.authLogger.log(`deleteAccount by token`);
        return this.authService.deleteAccount(token);

    }

    @Post('/account/token')
    createAccountToken( @Body(UserProfileValidationPipe) userProfileDto: UserProfileDto ): Promise<Object> {

        this.authLogger.log(`createAccountToken ${JSON.stringify(userProfileDto)}`);
        return this.authService.createAccountToken(userProfileDto);

    }

    @UseGuards(JwtGuard)
    @Patch('/account/sort')
    patchAccountSort( @Query('set', UserSortValidatioPipe) sort: UserSort, @Headers('authorization') bearerToken: Object ): Object {

        const token = extractTokenFromBearer(bearerToken);
        this.authLogger.log(`patchAccountSort by token`);
        return this.authService.patchAccountSort(sort, token);

    }
    
    @UseGuards(JwtGuard)
    @Patch('/account/username')
    patchAccountUsername( @Query('set', UsernameValidationPipe) username: string, @Headers('authorization') bearerToken: Object): Object {

        const token = extractTokenFromBearer(bearerToken);
        this.authLogger.log(`patchAccountUsername by token`);
        return this.authService.patchAccountUsername(username, token);
        
    }

    @UseGuards(JwtGuard)
    @Patch('/account/description')
    patchAccountDescription( @Body('description', DescriptionValidationPipe) description: string, @Headers('authorization') bearerToken: Object ): Object {
        
        const token = extractTokenFromBearer(bearerToken);
        this.authLogger.log(`patchAccountDescription by token`);
        return this.authService.patchAccountDescription(description, token);

    }

    @Get('/account/search')
    getAccountByQuery(
        @Query('email') email: string,
        @Query('username') username: string
    ) {
        return this.authService.getAccountByQuery(email, username);
    }

    @Get('/account/:_id')
    getAccountProfile( @Param() _id: string ) {
        
        return this.authService.getAccountProfile(_id);
        
    }

}
