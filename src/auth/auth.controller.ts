import { Body, Controller, Delete, Get, Logger, Patch, Post, Put } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    private authLogger: Logger = new Logger('AuthController');

    constructor(private authService: AuthService) {}

    @Get('/')
    getApiDocs() {
    }

    @Post('/account')
    createAccount() {
        this.authLogger.log(`createAccount`);
        this.authService.createAccount();
    }

    @Delete('/account')
    deleteAccount(){
        this.authLogger.log(`deleteAccount`);
        this.authService.deleteAccount();
    }

    @Post('/account/token')
    createAccountToken() {
        this.authLogger.log(`createAccountToken`);
        this.authService.createAccountToken();
    }

    @Patch('/account/level')
    patchAccountSort() {
        this.authLogger.log(`patchAccountSort`);
        this.authService.patchAccountSort();
    }
    
    @Patch('/auth/account/username')
    patchAccountUsername() {
        this.authLogger.log(`patchAccountUsername`);
        this.authService.patchAccountUsername();
    }
}
