import mongoose, { model, Schema } from 'mongoose'
import { BoxChat } from '~/types'

const boxChatSchema = new Schema<BoxChat>(
    {
        idUser: { type: mongoose.Types.ObjectId, ref: 'users' },
        idUserChat: { type: mongoose.Types.ObjectId, ref: 'users' },
        idRoom: { type: mongoose.Types.ObjectId, ref: 'roomChats' },
        nickname: String,
        contentChat: [{ type: mongoose.Types.ObjectId, ref: 'contentChats' }],
        isDelete: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
)

export default model('boxChats', boxChatSchema)
