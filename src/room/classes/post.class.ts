import { Prop, Schema } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";

@Schema()
export default class Post {
    
    @Prop({ type:String, required:true })
    @IsString()
    @IsNotEmpty()
    title: string;

    @Prop({ type:String, required:true })
    @IsString()
    @IsNotEmpty()
    context: string;

    @Prop({ type:Date, required:true })
    created: Date;

    constructor(title: string, context: string) {

        this.title = title;
        this.context = context;
        this.created = new Date();

    }
}