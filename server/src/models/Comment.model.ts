import { model, Schema } from 'mongoose'
import { Comment } from '~/types'

export const commentSchema = new Schema<Comment>(
    {
        content: String,
        userId: { ref: 'user', type: Schema.Types.ObjectId },
    },
    {
        timestamps: true,
    },
)

export default model('comment', commentSchema, 'comment')
