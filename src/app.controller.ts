import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {

    @Get('/')
    accessSite(): string {
        return 'hello world';
    }
    
}
