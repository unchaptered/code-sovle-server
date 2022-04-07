import { Prop, Schema } from "@nestjs/mongoose";
import { IsOptional } from "class-validator";
import Post from "./post.class";
import PostComment from "./post.comment.class";


@Schema()
export default class PostOrigin extends Post {

    @Prop([PostComment])
    @IsOptional()
    comment?: PostComment[];

    constructor(title: string, context: string) {
        super(title, context);
    }

}