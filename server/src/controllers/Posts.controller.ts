import { Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import postsProvider from '~/services/Posts.service'
import { JwtData } from '~/types'
import { isNotEmptyObject } from '~/utils/Validate'
class PostsController {
    async posts(req: Request, res: Response) {
        try {
            const user = req.user as JwtData
            const response = await postsProvider.posts(user.userName)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async getOnePosts({ params, user }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const { id } = params
            const response = await postsProvider.getOnePosts(id, userName)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async like({ user, body }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await postsProvider.like(userName, body)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async dislike({ user, body }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await postsProvider.dislike(userName, body)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async comment({ user, body }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await postsProvider.comment(userName, body)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async deleteComment({ user, body }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await postsProvider.deleteComment(userName, body)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async upload({ body, user }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await postsProvider.upload(body, userName)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async uploadImage({ body, file }: Request, res: Response) {
        try {
            const isZize = isNotEmptyObject(body)
            if (isZize) res.status(HttpStatus.OK).json({ msg: 'Upload success' })
            const response = await postsProvider.crop(body, file)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async suggests({ query, user }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await postsProvider.suggests(userName, Number(query.limit))
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async checkLike({ params, user }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await postsProvider.checkLike(userName, params.id)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async deletePosts({ params, user }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await postsProvider.deletePosts(params.id, userName)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async editPosts({ body, user }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await postsProvider.editPosts(body, userName)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
}
export default new PostsController()
