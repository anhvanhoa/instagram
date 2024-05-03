import mongoose, { model, Schema } from 'mongoose'
import { ContentChat } from '~/types/chat'

const contentChatSchema = new Schema<ContentChat>(
    {
        idBoxChat: { type: mongoose.Types.ObjectId, ref: 'boxChat' },
        idUser: { type: mongoose.Types.ObjectId, ref: 'boxChat' },
        message: String,
        image: String,
        isDeleteReceive: { type: Boolean, default: false },
        isDeleteSend: { type: Boolean, default: false },
        isSeen: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
)

export default model('contentChat', contentChatSchema, 'contentChat')
