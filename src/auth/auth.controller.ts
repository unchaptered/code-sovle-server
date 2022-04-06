import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { RegexUtility } from 'src/utility/regex.utility';
import { AuthService } from './auth.service';

import JoinDto from './dto/join.dto';
import LoginDto from './dto/login.dto';

import UserProfile from './classes/user.profile';
import UserSortValidatioPipe from './pipe/user.sort.pipe';

import { UserSort } from './types/user.sort.enum';
import { ThrottlerGuard } from '@nestjs/throttler';


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
@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
    
    constructor( private authService: AuthService )  {}

    /**
     * @UserSortValidationPipe 커스텀 파이프라인을 이용해서 유효성 검사를 진행한다.
     * @ValidationPipe class-validator 기능을 이용해서 유효성 검사를 진행한다.
     * 
     * @param sort 열거형 UserSort
     * @param joinDto 클래스 JoinDto
     * @returns Promise<UserProfile\>
     */
    @Post('/')
    login( @Body('sort', UserSortValidatioPipe) sort: UserSort, @Body(ValidationPipe) joinDto: JoinDto ): Promise<UserProfile> {
        return this.authService.join(sort, joinDto);
    }

    /**
     * @UserSortValidatioPipe 커스텀 파이프라인을 이용해서 유효성 검사를 진행한다.
     * @ValidationPipe class-validator 기능을 이용해서 유효성 검사를 진행한다.
     * 
     * @param sort 열거형 UserSort, UserSortValidatioPipe 을 이용한다.
     * @param loginDto 클래스 LoginDto, ValidationPipe 와 class-validator 를 이용한다.
     * @returns Promise<UserProfile\>
     */
    @Get('/')
    join( @Body('sort', UserSortValidatioPipe) sort: UserSort, @Body(ValidationPipe) loginDto: LoginDto ): Promise<UserProfile> {
        return this.authService.login(sort, loginDto);
    }

    /**
     * @RegexUtiltiy 정적으로 생성된 이메일 유효성 검사 정규식으로 유효성 검사를 진행한다.
     * 
     * @param email 문자열 email, RegexUtiltiy 을 이용한다.
     * @returns Promise<Boolean\>
     */
    @Get('/:email')
    findUserByEmail(@Param('email') email: string): Promise<Boolean> {
        const result = email.match(RegexUtility.emailRegex);
        if (result === null) throw new BadRequestException(`${email} isnt' in the Email Format`);
        return this.authService.findUserByEmail(email);
    }

    /**
     * 동적 쿼리문을 실행하기 앞서, 유저
     * 
     * @ParseIntPipe nest 내장 모듈로 숫자형인지를 확인한다.
     * 
     * @param sort 열거형 UserSort 을 받고 유효성 검사를 진행하고, 길이 0~2 사이의 배열로 만들어서 Service 에 전달한다.
     * @param limit 숫자를 받고 ParseIntPipe 를 실행하고, 1부터 30까지의 숫자만 받는 것은 Service 에서 처리한다.
     * @returns 
     */
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
        
        return this.authService.getAllUserByOptions(sort, limit);
    }
    
}

