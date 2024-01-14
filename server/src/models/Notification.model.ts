import { model, Schema } from 'mongoose'
import { Notification } from '~/types'

const notificationSchema = new Schema<Notification>(
    {
        fromUser: { ref: 'users', type: Schema.Types.ObjectId },
        toUser: { ref: 'users', type: Schema.Types.ObjectId },
        idPosts: { ref: 'posts', type: Schema.Types.ObjectId },
        content: String,
    },
    {
        timestamps: true,
    },
)

export default model('notifications', notificationSchema)
