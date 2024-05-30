import { model, Schema } from 'mongoose'
import { User } from '~/types/user'

export const userSchema = new Schema<User>(
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
        bio: { type: String, default: '' },
        birthday: { type: String, default: '' },
        gender: { type: String, enum: ['male', 'female', 'other', ''], default: '' },
        verify: { type: Boolean, default: false },
        avatar: { type: String, default: 'avatar-empty.png' },
        website: { type: String, default: '' },
    },
    {
        timestamps: true,
    },
)
userSchema.index({ userName: 'text', fullName: 'text' })
export default model<User>('user', userSchema, 'user')

export const selectUserBase = {
    fullName: true,
    userName: true,
    avatar: true,
    verify: true,
}

Object.freeze(selectUserBase)
