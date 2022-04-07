import { Schema } from "@nestjs/mongoose";
import Post from "./post.class";

@Schema()
export default class PostComment extends Post {

    constructor(title: string, context: string) {
        super(title, context);
    }

}