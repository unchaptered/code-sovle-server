import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from 'src/schema/user.schema';
import { Room, RoomDocument } from 'src/schema/room.schema';

@Injectable()
export class RoomRepository {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
        @InjectConnection() private mongoose:Connection
    ) {}

    async getRoomList(): Promise<RoomDocument[]> {
        return await this.roomModel.find().limit(10);
    }
    async postRoom(user: any, title: string): Promise<RoomDocument> {
        
        const { _id, username } = user;
        
        const userDB = await this.userModel.findById(_id);

        let roomDB = null;
        if (userDB !== null) {
            if (userDB.roomList.length < 3) {
                roomDB = await this.roomModel.create({ownerId:_id, ownerName: username, title });
                userDB.roomList.push(roomDB._id);
                userDB.save();
            } else {
                throw new BadRequestException(`Your room is over 3!`);
            }
        } else {
            throw new ForbiddenException(`Your token has a problem\nPlease re:login site!`);
        }

        return roomDB;
    }
    async patchRoomTitle(ownerId:string, _id: string, title: string): Promise<RoomDocument> {
        console.log(ownerId, _id, title);
        
        return this.roomModel.findOneAndUpdate({ _id, ownerId}, { title }, { new:true });
    }
    
    async deleteRoom(ownerId:string, _id: string) {

        const userDB = await this.userModel.findById(ownerId);
        
        let roomDB = null;
        if (userDB !== null) {
            const roomListLength = userDB.roomList.length;

            for (let idx = 0; idx < roomListLength ; idx++) {
                console.log(userDB.roomList, _id);
                if (userDB.roomList[idx].toString() == _id) {
                    userDB.roomList.splice(idx,1);
                    const [roomDeleted, userSaveed] = await Promise.all([
                        this.roomModel.findByIdAndDelete(_id),
                        userDB.save()
                    ]);
                    roomDB = roomDeleted;
                }
            }
        }

        // return roomDB;
    }

}