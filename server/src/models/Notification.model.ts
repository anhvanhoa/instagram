import { model, Schema } from 'mongoose'
import { NotificationSchema } from '~/types/notification'

const notificationSchema = new Schema<NotificationSchema>(
    {
        fromUser: { ref: 'user', type: Schema.Types.ObjectId },
        toUser: { ref: 'user', type: Schema.Types.ObjectId },
        idPosts: { ref: 'post', type: Schema.Types.ObjectId },
        isNotification: { type: Boolean, default: false },
        content: String,
    },
    {
        timestamps: true,
    },
)

export default model('notification', notificationSchema, 'notification')
