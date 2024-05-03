import z from 'zod'
import { config } from 'dotenv'
// import fs from 'fs'

const configOption = {
    path: `.env.${process.env.NODE_ENV || 'development'}`,
}
config(configOption)

// function checkFileEnv() {
//     if (!fs.existsSync(configOption.path)) {
//         throw new Error(`Không tìm thấy file ${configOption.path}`)
//     }
// }

// checkFileEnv()

const envSchema = z
    .object({
        URL_MONGODB: z.string(),
        KEY_SEND_MAIL: z.string(),
        JWT_KEY: z.string(),
        PASS_REDIS: z.string(),
        HOST_REDIS: z.string(),
        PORT_REDIS: z.string(),
        CLIENT_ID: z.string(),
        CLIENT_SECRET: z.string(),
        URL_CLIENT: z.string(),
        SECRET_SESSION: z.string(),
        DOMAIN: z.string(),
        PORT: z.string().default('8008'),
        API_SECRET_CLOUDINARY: z.string(),
        API_KEY_CLOUDINARY: z.string(),
    })
    .required()

const validationSchema = envSchema.safeParse(process.env)
if (!validationSchema.success) {
    console.log(validationSchema.error.issues)
    throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
}

const envConfig = validationSchema.data
export default envConfig
