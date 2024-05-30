import { model, Schema } from 'mongoose'
import { BlockSchema } from '~/types/user'

const blockSchema = new Schema<BlockSchema>(
    {
        user: { ref: 'user', type: Schema.Types.ObjectId },
        userBlock: { ref: 'user', type: Schema.Types.ObjectId },
    },
    {
        timestamps: true,
    },
)

export default model('blockUser', blockSchema, 'blockUser')
