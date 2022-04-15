import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Connection, Types } from 'mongoose';

import { User, UserDocument } from "src/schema/user.schema";
import { CardRepository } from "./card.repository";

@Injectable()
export class CardService {

    constructor(
        private cardRepository: CardRepository,
        private jwtService: JwtService
    ) {}

    async postInviteCard(token: string, _id:string, users:string[]) {

        const user: any = this.jwtService.decode(token);
        return this.cardRepository.postInviteCard(user._id, _id, users);

    }

    async acceptInviteCard(bearerToken: string, roomIds: string[]): Promise<Object> {

        const user: any = this.jwtService.decode(bearerToken);
        return this.cardRepository.acceptInviteCard(user._id, roomIds);

    }
    async denyInviteCard(bearerToken: string, roomIds: string[]): Promise<Object> {

        const user: any = this.jwtService.decode(bearerToken);
        return this.cardRepository.denyInviteCard(user._id, roomIds);

    }

    async postPassCard(bearerToken: string, roomId: string) {

        const user: any = this.jwtService.decode(bearerToken); 
        return this.cardRepository.postPassCard(user._id, roomId);
    }
    async acceptPassCard(bearerToken: string, roomId: string) {

        const user: any = this.jwtService.decode(bearerToken); 
        return this.cardRepository.acceptPassCard(user._id, roomId);
    }
    async denyPassCard(bearerToken: string, roomId: string) {

        const user: any = this.jwtService.decode(bearerToken); 
        return this.cardRepository.denyPassCard(user._id, roomId);
    }
}
