import { BadRequestException, Body, Controller, Get, Logger, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

import { RegexUtility } from 'src/utility/regex.utility';

import { UserService } from './user.service';

import JoinDto from './dto/join.dto';
import LoginDto from './dto/login.dto';
import UserSort from './types/user.sort.enum';
import UserProfile from './classes/user.profile';
import UserSortValidatioPipe from './pipe/user.sort.pipe';


/**
 * @AuthController
 * 
 * @URL **GET /auth/** sort, email, password
 * @function login() 
 * 
 * @URL **POST /auth/** sort, email, username, password
 * @function join()
 * 
 * @URL **GET /auth/list**
 * @function getAllUserByOptions()
 * 
 * @URL **GET /auth/:email**
 * @function findUserByEmail()
 */
@Controller('user')
@UseGuards(ThrottlerGuard)
export class UserController {

    private authLogger: Logger = new Logger('AuthLogger');

    constructor(
        private userService: UserService,
    ) {}


    @Post('/join')
    // @ApiCreatedResponse({ description: 'The record has been successfully created.'})
    // @ApiForbiddenResponse({ description: 'Forbidden.'})
    join( @Body('sort', UserSortValidatioPipe) sort: UserSort, @Body(ValidationPipe) joinDto: JoinDto ): Promise<UserProfile> {
        this.authLogger.log(`Client try to join ${sort} ${JSON.stringify(joinDto)}`);
        return this.userService.join(sort, joinDto);
    }

    @Post('/login')
    login( @Body('sort', UserSortValidatioPipe) sort: UserSort, @Body(ValidationPipe) loginDto: LoginDto ): Promise<UserProfile> {
        this.authLogger.log(`Client try to login ${sort} ${JSON.stringify(loginDto)}`);
        return this.userService.login(sort, loginDto);
    }

    @Get('/list')
    getAllUserByOptions(
        @Query('sort') sort: UserSort[], @Query('limit', ParseIntPipe) limit: number ): Promise<UserProfile[]> {
        
        // Manual Validation Checking
        if (sort !== undefined) {
            if (typeof sort === 'object') {

                // 2 개 이상의 sort 가 왔을 때
                const sortPipe = new UserSortValidatioPipe();
                sort.forEach(val => sortPipe.transform(val));

            } else {

                // 단수의 sort 가 왔을 때
                new UserSortValidatioPipe().transform(sort);
                sort = [sort];

            }
        } else {}
        
        return this.userService.getAllUserByOptions(sort, limit);
    }

    @Get('/:email')
    findUserByEmail(@Param('email') email: string): Promise<Boolean> {
        const result = email.match(RegexUtility.emailRegex);
        if (result === null) throw new BadRequestException(`${email} isnt' in the Email Format`);
        return this.userService.findUserByEmail(email);
    }
}

