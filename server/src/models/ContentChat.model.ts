import mongoose, { model, Schema } from 'mongoose'
import { ContentChat } from '~/types'

const contentChatSchema = new Schema<ContentChat>(
    {
        idBoxChat: { type: mongoose.Types.ObjectId, ref: 'boxChats' },
        idUser: { type: mongoose.Types.ObjectId, ref: 'boxChats' },
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

export default model('contentChats', contentChatSchema)
