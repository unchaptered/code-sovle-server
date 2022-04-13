import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import UserCardDto from "src/auth/dto/user.card.dto";
import { RoomRepository } from "./room.repository";

@Injectable()
export class RoomService {

    constructor(
        private roomRepository: RoomRepository,
        private jwtService: JwtService
    ) {}

    async getRoomList() {
        return this.roomRepository.getRoomList();
    }

    async postRoom(token: string, title: string) {

        const user: Object = this.jwtService.decode(token);

        const result = await this.roomRepository.postRoom(user, title);
        
        return result;
    }
    async patchRoomTitle(token: string, _id: string, title: string) {

        const user: any = this.jwtService.decode(token);
        const ownerId: string = user._id;

        const result = await this.roomRepository.patchRoomTitle(ownerId, _id, title);
        
        return result;
    }
    async deleteRoom(token: string, _id: string) {

        const user: any = this.jwtService.decode(token);
        const ownerId: string = user._id;

        const result = await this.roomRepository.deleteRoom(ownerId, _id);
        
        return result;
    }

    async getRoomData(token: string, title: string) {
        return this.roomRepository.getRoomData(title);
    }
    
    async postInviteCard(token: string, _id:string, users:string[]) {

        const user: any = this.jwtService.decode(token);
        return this.roomRepository.postInviteCard(user._id, _id, users);

    }
}