import { model, Schema } from 'mongoose'
import { Comment } from '~/types'

export const comment = new Schema<Comment>(
    {
        content: String,
        userId: { ref: 'users', type: Schema.Types.ObjectId },
    },
    {
        timestamps: true,
    },
)

export default model('comments', comment)
