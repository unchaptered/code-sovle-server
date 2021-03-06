import { Body, Controller, Delete, Get, Headers, Logger, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import UserCardDto from 'src/auth/dto/user.card.dto';
import { extractTokenFromBearer } from 'src/token/jwt.extract';
import { JwtGuard } from 'src/token/jwt.guard';
import { RoomService } from './room.service';

@Controller('room')
@UseGuards(ThrottlerGuard)
export class RoomController {

    private roomLogger: Logger = new Logger('RoomController');

    constructor( private roomService: RoomService ) {}

    @Get('/')
    getRoomList() {
        return this.roomService.getRoomList();
    }
    
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
    @Get('/:_id')
    getRoomData(
        @Headers('authorization') bearerToken: Object,
        @Param('_id') _id: string
    ) {
        const token = extractTokenFromBearer(bearerToken);
        return this.roomService.getRoomData(token, _id);
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
    
    // @UseGuards(JwtGuard)
    // @Post('/invite-card')
    // postInviteCard(
    //     @Headers('authorization') bearerToken: Object,
    //     @Body('_id') _id: string,
    //     @Body('usersId') users: string[]
    // ) {
    //     // (?????????) ?????? ???????????? ???????????? ????????????.
    //     const token = extractTokenFromBearer(bearerToken);
    //     return this.roomService.postInviteCard(token, _id, users);
    // }
    @Post('/')
    responseInviteCard() {
        // (?????????) ???????????? 
    }
    @Post('/')
    requestPassCard() {
        // (?????????) ???????????? ?????? ???????????? ???????????????.
    }
    @Post('/')
    responsePassCard() {
        // (?????????) ?????? ???????????? ???????????? ???????????????.
    }
}
