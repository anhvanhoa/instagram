import { model, Schema } from 'mongoose'
import { LikeSchema } from '~/types/like'
const likeSchema = new Schema<LikeSchema>(
    {
        commentId: { ref: 'comment', type: Schema.Types.ObjectId },
        postId: { ref: 'post', type: Schema.Types.ObjectId },
        user: { ref: 'user', type: Schema.Types.ObjectId },
    },
    {
        timestamps: true,
    },
)

export default model('like', likeSchema, 'like')
