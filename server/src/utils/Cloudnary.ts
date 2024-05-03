import { v2 as cloudinary } from 'cloudinary'
class Cloudinary {
    upload(file: string) {
        return cloudinary.uploader.upload(file, {
            folder: 'instagram',
        })
    }
    destroy(public_id: string) {
        return cloudinary.uploader.destroy(public_id)
    }
}
const cloudinaryProvider = new Cloudinary()

export default cloudinaryProvider
