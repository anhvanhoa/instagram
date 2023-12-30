import { Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import postsProvider from '~/services/Posts.service'
import { JwtyData } from '~/types'
class PostsController {
    async posts(req: Request, res: Response) {
        try {
            const user = req.user as JwtyData
            const response = await postsProvider.posts(user.userName)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            console.log(error)
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async upload({ body, user }: Request, res: Response) {
        try {
            const { userName } = user as JwtyData
            const response = await postsProvider.upload(body, userName)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            console.log(error)
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
}
export default new PostsController()
