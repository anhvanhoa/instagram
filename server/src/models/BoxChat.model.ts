import mongoose, { model, Schema } from 'mongoose'
import { BoxChat } from '~/types/boxChat'

const boxChatSchema = new Schema<BoxChat>(
    {
        idUser: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        idUserChat: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
        idRoom: { type: mongoose.Types.ObjectId, ref: 'roomChat' },
        nickname: String,
        contentChat: [{ type: mongoose.Types.ObjectId, ref: 'contentChat' }],
        isDelete: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
)

export default model('boxChat', boxChatSchema, 'boxChat')
