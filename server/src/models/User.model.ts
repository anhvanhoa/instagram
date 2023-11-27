import { model, Schema } from 'mongoose';
import { User } from '~/types';

const users = new Schema<User>(
    {
        fbId: { type: String, default: null },
        userName: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },
        email: {
            type: String,
            default: null,
            lowercase: true,
            unique: true,
        },
        numberPhone: {
            type: String,
            unique: true,
            default: null,
        },
        password: {
            type: String,
            minlength: 6,
            maxlength: 255,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        bio: { type: String },
        birthday: { type: String },
        gender: { type: String },
        notifications: { type: [] },
        posts: { type: [] },
        stories: { type: [] },
        verify: { type: Boolean },
        followers: { type: [] },
        following: { type: [] },
        avatar: { type: String },
    },
    {
        timestamps: true,
    },
);

export default model('users', users);
