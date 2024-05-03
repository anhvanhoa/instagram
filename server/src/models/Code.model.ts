import { model, Schema } from 'mongoose'
import { Code } from '~/types'

const codeSchema = new Schema<Code>(
    {
        email: {
            type: String,
            default: null,
            lowercase: true,
        },
        numberPhone: {
            type: String,
            default: null,
        },
        otp: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    },
)

export default model('code', codeSchema, 'code')
