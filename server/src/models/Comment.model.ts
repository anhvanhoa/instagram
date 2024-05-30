import { model, Schema } from 'mongoose'
import { CommentSchema } from '~/types/comment'

export const commentSchema = new Schema<CommentSchema>(
    {
        content: String,
        user: { ref: 'user', type: Schema.Types.ObjectId },
        postId: { ref: 'post', type: Schema.Types.ObjectId },
        parentId: { ref: 'comment', type: Schema.Types.ObjectId },
        isDelete: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
)

export default model('comment', commentSchema, 'comment')
