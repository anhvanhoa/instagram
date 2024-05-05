import Jimp from 'jimp'
import cloudinaryProvider from '~/utils/Cloudnary'
import fs from 'fs'
import { SizeCrop } from '~/types/image'
import { BadRequestError } from '~/utils/Errors'

class ImageService {
    async crop({ height, width, x, y }: SizeCrop, file?: Express.Multer.File) {
        if (!file) throw new BadRequestError({ message: 'File not found' })
        if (!height || !width || !x || !y) return file.filename
        const image = await Jimp.read(file.path)
        const widthImg = image.getWidth()
        const heightImg = image.getHeight()
        height = heightImg * Number(height)
        width = widthImg * Number(width)
        x = widthImg * Number(x)
        y = heightImg * Number(y)
        image.crop(x, y, width, height)
        const path = `public/${file.filename}.${image.getExtension()}`
        await image.writeAsync(path)
        const imageComplete = await cloudinaryProvider.upload(path)
        await cloudinaryProvider.destroy(file.filename)
        fs.unlinkSync(path)
        return `${imageComplete.public_id}.${imageComplete.format}`
    }
}
const imageProvider = new ImageService()
export default imageProvider
