import { timeStamp } from 'console'
import mongoose, { model, Schema } from 'mongoose'
import { RoomChat } from '~/types'

const roomChatSchema = new Schema<RoomChat>(
    {
        notification: {
            type: Boolean,
            default: true,
        },
        name: {
            type: String,
            default: '',
        },
        members: [
            {
                idUser: { type: mongoose.Types.ObjectId, ref: 'users' },
                joinTime: { default: Date.now, type: Date },
                outTime: { default: '', type: Date },
                isOut: { type: Boolean, default: false },
            },
        ],
    },
    {
        timestamps: true,
    },
)

export default model('roomChats', roomChatSchema)
