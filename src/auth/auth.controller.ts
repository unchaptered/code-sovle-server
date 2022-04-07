import {
    Controller, Get, Post, Patch, Delete,
    Body, Logger, ValidationPipe, Query
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
import { ConfigService } from '@nestjs/config';



@Controller('auth')
export class AuthController {

    private authLogger: Logger = new Logger('AuthController');

    constructor( private authService: AuthService, private configService: ConfigService ) {}

    @Get('/')
    getApiDocs() {
    }

    @Post('/account')
    createAccount( @Body(UserProfileDetailValidationPipe) userProfileDetailDto: UserProfileDetailDto ): Promise<UserDocument> {

        this.authLogger.log(`createAccount ${JSON.stringify(userProfileDetailDto)}`);
        return this.authService.createAccount(userProfileDetailDto);

    }

    @Delete('/account')
    deleteAccount( @Body(UserProfileValidationPipe) userProfileDto: UserProfileDto ): Promise<UserDocument> {

        this.authLogger.log(`deleteAccount ${JSON.stringify(userProfileDto)}`);
        return this.authService.deleteAccount(userProfileDto);

    }

    @Post('/account/token')
    createAccountToken( @Body(UserProfileValidationPipe) userProfileDto: UserProfileDto ): Promise<UserDocument> {

        // const hello =  this.configService.get<string>('SERVER_PORT');

        this.authLogger.log(`createAccountToken ${JSON.stringify(userProfileDto)}`);
        return this.authService.createAccountToken(userProfileDto);

    }

    @Patch('/account/sort')
    patchAccountSort(
        @Query('set', UserSortValidatioPipe) sort: UserSort,
        @Body(UserProfileValidationPipe) userProfileDto: UserProfileDto
    ) {

        this.authLogger.log(`patchAccountSort ${JSON.stringify({sort, userProfileDto})}`);
        return this.authService.patchAccountSort(sort, userProfileDto);

    }
    
    @Patch('/account/username')
    patchAccountUsername(
        @Query('set', UsernameValidationPipe) username: string,
        @Body(UserProfileValidationPipe) userProfileDto: UserProfileDto
    ) {

        this.authLogger.log(`patchAccountUsername ${JSON.stringify({username, userProfileDto})}`);
        this.authService.patchAccountUsername(username, userProfileDto);
        
    }
}
