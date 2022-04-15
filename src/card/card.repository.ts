import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Connection, Types } from 'mongoose';


import { Room, RoomDocument } from "../schema/room.schema";
import { User, UserDocument } from "../schema/user.schema";

@Injectable()
export class CardRepository {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    ) {}

    // postInviteCard, - RoomRepo
    // acceptInviteCard, deleteInviteCard - UserRepo
    async postInviteCard(tokenId: string, roomId: string, users: string[]): Promise<RoomDocument> {

        const roomExists = await this.roomModel.exists({ _id:roomId, ownerId:tokenId });
        if (roomExists === null) throw new ForbiddenException('No access right');
        
        const [ room, _users ] = await Promise.all([
            this.roomModel.findOneAndUpdate(
                { $and: [ { _id: roomId }, { ownerId: tokenId } ] },
                { $addToSet: { inviteCardList: { $each: [ ...users ] } } },
                { new: true }).populate({ path: 'inviteCardList', model: 'User', select: '_id sort username' })
                    .select('_id title ownerId ownerName userIdList inviteCardList'),
                    
            (async ()=>{
                 const userList = await this.userModel.find({ _id:
                    { $in: [ ...users.map(val=>new Types.ObjectId(val)) ] }
                });

                 let inviteCardSet = null;
                 for (let idx = 0; idx < userList.length; idx++) {
                    inviteCardSet = new Set(userList[idx].invitedCardList);
                    inviteCardSet.add(roomId);
                    userList[idx].invitedCardList = [...inviteCardSet];
                    await userList[idx].save();
                 }
                 return userList;
            })(),
        ]);

        return room;
    }

    
    // postInviteCard, - RoomRepo
    // acceptInviteCard, deleteInviteCard - UserRepo
    async acceptInviteCard(tokenId: string, roomIds: string[]): Promise<UserDocument> {

        const userExists = await this.userModel.exists({ _id:tokenId });
        if (userExists === null) throw new ForbiddenException('No User');

        const [ user, _rooms ] = await Promise.all([
            this.userModel.findByIdAndUpdate({ _id: tokenId },
                {
                    $pop: { invitedCardList: { $each: [ ...roomIds ] } },
                    $addToSet: { roomList: { $each: [ ...roomIds ] } }
                }, { new: true }),

            (async () => {
                const roomList = await this.roomModel.find({ _id:
                    { $in: [ ...roomIds.map(val => new Types.ObjectId(val)) ] }
                });

                let userSet = null;
                let invitedCardSet = null;
                for (const room of roomList) {
                    userSet = new Set(room.userIdList);
                    invitedCardSet = new Set(room.inviteCardList);

                    if (invitedCardSet.has(tokenId)) {
                        userSet.add(tokenId);
                        invitedCardSet.delete(tokenId);
                    }
                    await room.save();
                }
            })()
        ]);

        return user;
    }
    
    // postInviteCard, - RoomRepo
    // acceptInviteCard, deleteInviteCard - UserRepo
    async denyInviteCard(tokenId: string, roomIds: string[]): Promise<UserDocument> {

        const userExists = await this.userModel.exists({ _id:tokenId });
        if (userExists === null) throw new ForbiddenException('No User');

        const [ user, _rooms ] = await Promise.all([
            this.userModel.findByIdAndUpdate({ _id: tokenId },
                {
                    $pop: {
                        invitedCardList: { $each: [ ...roomIds ] },
                        roomList: { $each: [ ...roomIds ] }
                    },
                }, { new:true }),

            (async () => {
                const roomList = await this.roomModel.find({ _id:
                    { $in: [ ...roomIds.map(val => new Types.ObjectId(val)) ] }
                });

                let invitedCardSet = null;
                for (const room of roomList) {
                    invitedCardSet = new Set(room.inviteCardList);

                    if (invitedCardSet.has(tokenId)) {
                        invitedCardSet.delete(tokenId);
                    }
                    await room.save();
                }
            })()
        ]);

        return user;
    }

}