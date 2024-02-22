import { model, Schema } from 'mongoose'
import { Token } from '~/types'

const tokenSchema = new Schema<Token>(
    {
        token: String,
        username: String,
    },
    {
        timestamps: true,
    },
)

export default model('token', tokenSchema)
