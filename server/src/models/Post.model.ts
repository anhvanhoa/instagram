import { model, Schema } from 'mongoose'
import { Post } from '~/types/post'
const postSchema = new Schema<Post>(
    {
        author: { ref: 'user', type: Schema.Types.ObjectId },
        likes: [{ ref: 'user', type: Schema.Types.ObjectId }],
        comments: [{ ref: 'comment', type: Schema.Types.ObjectId }],
        title: String,
        contents: [{ type: String }],
        isDelete: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
)

export default model('post', postSchema, 'post')
