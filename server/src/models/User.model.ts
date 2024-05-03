import { model, Schema } from 'mongoose'
import { User } from '~/types/user'

const userSchema = new Schema<User>(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            index: true,
        },
        email: {
            type: String,
            default: null,
            lowercase: true,
            index: true,
        },
        numberPhone: {
            type: String,
            default: null,
            index: true,
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
        gender: { type: String, enum: ['nam', 'nữ', 'khác'] },
        notifications: { type: [{ ref: 'notification', type: Schema.Types.ObjectId }] },
        posts: { type: [{ ref: 'post', type: Schema.Types.ObjectId }] },
        stories: { type: [] },
        verify: { type: Boolean },
        followers: { type: [{ ref: 'user', type: Schema.Types.ObjectId }] },
        following: { type: [{ ref: 'user', type: Schema.Types.ObjectId }] },
        avatar: { type: String, default: '' },
    },
    {
        timestamps: true,
    },
)
userSchema.index({ userName: 'text', fullName: 'text' })
export default model<User>('user', userSchema, 'user')
