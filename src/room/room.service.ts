import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RoomRepository } from "./room.repository";

@Injectable()
export class RoomService {

    constructor(
        private roomRepository: RoomRepository,
        private jwtService: JwtService
    ) {}

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
}