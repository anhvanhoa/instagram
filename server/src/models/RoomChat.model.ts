import mongoose, { model, Schema } from 'mongoose'
import { RoomChat } from '~/types/roomChat'

const roomChatSchema = new Schema<RoomChat>(
    {
        members: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
            minlength: 2,
            maxlength: 50,
        },
    },
    {
        timestamps: true,
    },
)

export default model('roomChat', roomChatSchema, 'roomChat')
