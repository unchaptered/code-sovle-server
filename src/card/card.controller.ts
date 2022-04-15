import { Body, Controller, Delete, Headers, Logger, Patch, Post, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { extractTokenFromBearer } from 'src/token/jwt.extract';
import { JwtGuard } from 'src/token/jwt.guard';
import { CardService } from './card.service';

@Controller('card')
@UseGuards(ThrottlerGuard)
export class CardController {

    private roomLogger: Logger = new Logger('RoomController');

    constructor( private cardService: CardService ) {}

    @UseGuards(JwtGuard)
    @Post('/invite-card')
    postInviteCard(
        @Headers('authorization') bearerToken: Object,
        @Body('_id') _id: string,
        @Body('usersId') users: string[]
    ) {
        // (오너만) 방이 사람에게 초대장을 보냅니다.
        const token = extractTokenFromBearer(bearerToken);
        return this.cardService.postInviteCard(token, _id, users);
        
    }
    
    @UseGuards(JwtGuard)
    @Post('/accept-invited-card')
    acceptinviteCard(
        @Headers('authorization') bearerToken: Object,
        @Body('roomIds') roomIds: string[]
    ) {
        const token = extractTokenFromBearer(bearerToken);
        return this.cardService.acceptInviteCard(token, roomIds);
    }

    @UseGuards(JwtGuard)
    @Post('/deny-invited-card')
    denyInviteCard(
        @Headers('authorization') bearerToken: Object,
        @Body('roomIds') roomIds: string[]
    ) {
        
        const token = extractTokenFromBearer(bearerToken);
        return this.cardService.denyInviteCard(token, roomIds);

    }

}
