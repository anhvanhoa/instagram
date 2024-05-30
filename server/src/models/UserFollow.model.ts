import { model, Schema } from 'mongoose'
import { UserFollowersSchema } from '~/types/user'

const userfollowersSchema = new Schema<UserFollowersSchema>(
    {
        user: { ref: 'user', type: Schema.Types.ObjectId },
        followers: { ref: 'user', type: Schema.Types.ObjectId },
    },
    {
        timestamps: true,
    },
)

export default model('userFollowers', userfollowersSchema, 'userFollowers')
