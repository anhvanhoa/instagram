import { model, Schema } from 'mongoose'
import { Posts } from '~/types'

const posts = new Schema<Posts>(
    {
        author: { ref: 'users', type: Schema.Types.ObjectId },
        likes: [{ ref: 'users', type: Schema.Types.ObjectId }],
        comments: [
            {
                content: String,
                created_at: { default: new Date(), type: Date },
                userId: { ref: 'users', type: Schema.Types.ObjectId },
            },
        ],
        title: String,
        contents: [{ type: String }],
    },
    {
        timestamps: true,
    },
)

export default model('posts', posts)
