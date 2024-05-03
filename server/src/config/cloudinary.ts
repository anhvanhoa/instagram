import { v2 as cloudinary } from 'cloudinary'
import envConfig from './env'

cloudinary.config({
    cloud_name: 'dlzbq5oho',
    api_key: envConfig.API_KEY_CLOUDINARY,
    api_secret: envConfig.API_SECRET_CLOUDINARY,
})
