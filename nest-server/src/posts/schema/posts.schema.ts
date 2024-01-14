import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Comment } from './comment.schema';

export type PostsDocument = HydratedDocument<Posts>;

@Schema({
    timestamps: true
})
export class Posts {
    @Prop()
    title: string;
    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    author: mongoose.Types.ObjectId;
    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }] })
    likes: User[];
    @Prop()
    comments: Comment[];
    @Prop()
    contents: string[];
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
