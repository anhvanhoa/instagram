import { isNotEmptyObject } from '~/utils/Validate'
import { Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import imageProvider from '~/services/Image.service'
import { v2 as cloudinary } from 'cloudinary'

class ImageController {
    async uploadImage({ body, file }: Request, res: Response) {
        try {
            const isZize = isNotEmptyObject(body)
            if (isZize) res.status(HttpStatus.OK).json({ msg: 'Upload success' })
            const response = await imageProvider.crop(body, file)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
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
