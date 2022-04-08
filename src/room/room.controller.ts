import { Body, Controller, Delete, Get, Headers, Logger, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { extractTokenFromBearer } from 'src/token/jwt.extract';
import { JwtGuard } from 'src/token/jwt.guard';
import { RoomService } from './room.service';

@Controller('room')
@UseGuards(ThrottlerGuard)
export class RoomController {

    private roomLogger: Logger = new Logger('RoomController');

    constructor( private roomService: RoomService ) {}

    @Get('/')
    getRoomList() { }
    
    @UseGuards(JwtGuard)
    @Post('/')
    postRoom(
        @Headers('authorization') bearerToken: Object,
        @Body('title') title: string
    ) {

        const token = extractTokenFromBearer(bearerToken);
        this.roomLogger.log(`postRoom by token`);
        return this.roomService.postRoom(token, title);

    }
    
    @UseGuards(JwtGuard)
    @Patch('/:_id')
    patchRoomTitle(
        @Headers('authorization') bearerToken: Object,
        @Param('_id') _id: string,
        @Body('title') title: string
    ) {

        const token = extractTokenFromBearer(bearerToken);
        this.roomLogger.log(`patchRoomTitle by token`);
        return this.roomService.patchRoomTitle(token, _id, title);
        
    }
    
    @UseGuards(JwtGuard)
    @Delete('/:_id')
    deleteRoom(
        @Headers('authorization') bearerToken: Object,
        @Param('_id') _id:string
    ) {

        const token = extractTokenFromBearer(bearerToken);
        this.roomLogger.log(`deleteRoom by token`);
        return this.roomService.deleteRoom(token, _id);
        
    }
    
    @Post('/')
    requestInvitedCard() {
        // (오너만) 방이 사람에게 초대장을 보냅니다.
    }
    @Post('/')
    responseInvitedCard() {
        // (모두가) 초대장을 
    }
    @Post('/')
    requestPassCard() {
        // (모두가) 사람들이 방에 입장권을 요청합니다.
    }
    @Post('/')
    responsePassCard() {
        // (오너만) 방이 사람들의 입장권을 승인합니다.
    }
}
