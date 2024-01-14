import { model, Schema } from 'mongoose'
import { Posts } from '~/types'

const posts = new Schema<Posts>(
    {
        author: { ref: 'users', type: Schema.Types.ObjectId },
        likes: [{ ref: 'users', type: Schema.Types.ObjectId }],
        comments: [{ ref: 'comments', type: Schema.Types.ObjectId }],
        title: String,
        contents: [{ type: String }],
    },
    {
        timestamps: true,
    },
)

export default model('posts', posts)
