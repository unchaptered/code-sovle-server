import { Schema } from "@nestjs/mongoose";

@Schema()
export default class UserCardDto {

    _id: string;

    username: string;

    constructor({ _id, username }) {
        this._id = _id;
        this.username = username;
    }
}
