import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type PostsDocument = HydratedDocument<Posts>;

@Schema({
    timestamps: true,
})
export class Posts {
    @Prop()
    title: string;
    @Prop({ type: mongoose.Types.ObjectId, ref: 'users' })
    author: ObjectId;
    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'users' }] })
    likes: User[];
    @Prop({
        type: [{ userId: { type: mongoose.Types.ObjectId, ref: 'users' } }],
    })
    comments: {
        content: string;
        created_at: Date;
        userId: mongoose.Types.ObjectId;
    }[];
    @Prop()
    contents: string[];
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
