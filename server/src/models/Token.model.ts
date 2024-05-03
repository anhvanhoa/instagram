import { model, Schema } from 'mongoose'
import { Token } from '~/types/token'

const tokenSchema = new Schema<Token>(
    {
        token: {
            type: String,
            unique: true,
            required: true,
        },
        idUser: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

export default model('token', tokenSchema, 'token')
