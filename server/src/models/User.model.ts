import { model, Schema } from 'mongoose'
import { User } from '~/types'

const users = new Schema<User>(
    {
        fbId: { type: String, default: '' },
        userName: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            validate: [
                (email: string) => /^[^\s!@#$%^&*()_+{}\\[\]:;<>,.?~\\/-]+$/.test(email),
                'userName not valid',
            ],
        },
        email: {
            type: String,
            default: null,
            lowercase: true,
        },
        numberPhone: {
            type: String,
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
        posts: { type: [{ ref: 'posts', type: Schema.Types.ObjectId }] },
        stories: { type: [] },
        verify: { type: Boolean },
        followers: { type: [{ ref: 'users', type: Schema.Types.ObjectId }] },
        following: { type: [{ ref: 'users', type: Schema.Types.ObjectId }] },
        avatar: { type: String },
    },
    {
        timestamps: true,
    },
)

export default model<User>('users', users)
