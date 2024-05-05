import { Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import imageProvider from '~/services/Image.service'
import { v2 as cloudinary } from 'cloudinary'
import { isError } from '~/utils/Errors'

class ImageController {
    async uploadImage({ body, file }: Request, res: Response) {
        try {
            const response = await imageProvider.crop(body, file)
            return res.status(HttpStatus.OK).json({
                message: 'Upload success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async handleImage(req: Request, res: Response) {
        try {
            const path = req.path.slice(7)
            await cloudinary.api.resource(path.split('.')[0])
            return res.redirect(
                `http://res.cloudinary.com/dlzbq5oho/image/upload/v1714437857${path}`,
            )
        } catch (_error: any) {
            return res.status(404).send('Not found')
        }
    }
}

export default new ImageController()
