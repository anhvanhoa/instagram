import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Posts } from 'src/posts/schema/posts.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true
})
export class User {
    @Prop()
    fbId: string;
    @Prop({ required: true, unique: true, lowercase: true })
    userName: string;
    @Prop({ lowercase: true })
    email: string;
    @Prop()
    numberPhone: string;
    @Prop({ maxlength: 255, required: true })
    password: string;
    @Prop({ required: true })
    fullName: string;
    @Prop()
    bio: string;
    @Prop()
    birthday: string;
    @Prop()
    gender: string;
    @Prop()
    avatar: string;
    @Prop()
    verify: boolean;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }] })
    posts: Posts[];
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }] })
    followers: ObjectId[];
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }] })
    following: ObjectId[];
    @Prop()
    stories: [];
    @Prop()
    notifications: [];
}

export const UserSchema = SchemaFactory.createForClass(User);
