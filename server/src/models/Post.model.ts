import { model, Schema } from 'mongoose'
import { PostSchema } from '~/types/post'
import { userSchema } from './User.model'

const postSchema = new Schema<PostSchema>(
    {
        author: {
            ref: 'user',
            type: Schema.Types.ObjectId,
            schema: userSchema,
        },
        title: String,
        media: [{ type_media: String, content: String }],
        commentDisable: { type: Boolean, default: false },
        countLikeDisable: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
)

export default model('post', postSchema, 'post')
