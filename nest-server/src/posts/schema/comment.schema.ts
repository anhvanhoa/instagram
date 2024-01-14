import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({
    timestamps: true
})
export class Comment {
    @Prop()
    content: string;
    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    userId: mongoose.Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
