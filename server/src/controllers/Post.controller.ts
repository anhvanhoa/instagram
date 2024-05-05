import { Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import postsProvider from '~/services/Post.service'
import { isError } from '~/utils/Errors'
class PostsController {
    async posts(req: Request, res: Response) {
        try {
            const response = await postsProvider.posts(req.user!)
            return res.status(HttpStatus.OK).json({
                message: 'Get posts success',
                data: response,
            })
        } catch (error: any) {
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async getPost({ params, user }: Request, res: Response) {
        try {
            const { userName } = user!
            const { id } = params
            const response = await postsProvider.getOnePosts(id, userName)
            return res.status(HttpStatus.OK).json({
                message: 'Get post success',
                date: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async like(req: Request, res: Response) {
        try {
            await postsProvider.like(req.user!.userName, req.body)
            return res.status(HttpStatus.OK).json({ message: 'Like posts success !' })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async dislike({ user, body }: Request, res: Response) {
        try {
            const { userName } = user!
            await postsProvider.dislike(userName, body)
            return res.status(HttpStatus.OK).json({ message: 'Dislike posts success !' })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async comment({ user, body }: Request, res: Response) {
        try {
            const { userName } = user!
            await postsProvider.comment(userName, body)
            return res.status(HttpStatus.OK).json({ message: 'Comment posts success !' })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async deleteComment({ user, body }: Request, res: Response) {
        try {
            const { userName } = user!
            await postsProvider.deleteComment(userName, body)
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Delete comment posts success !' })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async upload({ body, user }: Request, res: Response) {
        try {
            const { userName } = user!
            const response = await postsProvider.upload(body, userName)
            return res.status(HttpStatus.OK).json({
                message: 'Upload posts success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async suggests({ query, user }: Request, res: Response) {
        try {
            const response = await postsProvider.suggests(
                user!.userName,
                Number(query.limit),
            )
            return res.status(HttpStatus.OK).json({
                message: 'Get posts success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async checkLike({ params, user }: Request, res: Response) {
        try {
            const { userName } = user!
            const response = await postsProvider.checkLike(userName, params.id)
            return res.status(HttpStatus.OK).json({
                message: 'check like success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async deletePosts({ params, user }: Request, res: Response) {
        try {
            const { userName } = user!
            await postsProvider.deletePosts(params.id, userName)
            return res.status(HttpStatus.OK).json({ message: 'Delete success' })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async editPosts({ body, user }: Request, res: Response) {
        try {
            const { userName } = user!
            await postsProvider.editPosts(body, userName)
            return res.status(HttpStatus.OK).json({ message: 'Edit success' })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
}
export default new PostsController()
