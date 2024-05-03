import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary'
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (): UploadApiOptions => {
        return {
            folder: 'instagram',
        }
    },
})

const MAX_SIZE = 1024 * 1024 * 4
const saveImage = multer({
    storage,
    limits: { fileSize: MAX_SIZE },
}).single('images')
export default saveImage
