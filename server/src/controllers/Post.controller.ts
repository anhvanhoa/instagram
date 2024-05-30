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
    async postsUser(req: Request, res: Response) {
        try {
            const response = await postsProvider.postsUser({
                username: req.params.username,
                idMe: req.user!._id,
            })
            if (!response)
                return res.status(304).json({
                    message: 'Not found post',
                    data: response,
                })
            return res.status(HttpStatus.OK).json({
                message: 'Get post success',
                data: response,
            })
        } catch (error: any) {
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async getPost({ params, user }: Request, res: Response) {
        try {
            const { id } = params
            const response = await postsProvider.getPost(id, user!._id)
            return res.status(HttpStatus.OK).json({
                message: 'Get post success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async like(req: Request, res: Response) {
        try {
            const response = await postsProvider.like({
                idMe: req.user!._id,
                postId: req.body.postId,
            })
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Like posts success !', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async dislike({ user, body }: Request, res: Response) {
        try {
            const response = await postsProvider.dislike({
                idMe: user!._id,
                postId: body.postId,
            })
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Dislike posts success !', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async comment({ user, body, params }: Request, res: Response) {
        try {
            const { _id } = user!
            const response = await postsProvider.createComment(
                { idMe: _id, postId: params.id },
                body,
            )
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Comment posts success !', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }

    async commentDisablePost({ user, body, params }: Request, res: Response) {
        try {
            const { _id } = user!
            const response = await postsProvider.commentDisablePost({
                idMe: _id,
                postId: params.id,
                commentDisable: body.commentDisable,
            })
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Comment posts success !', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }

    async deleteComment({ user, params }: Request, res: Response) {
        try {
            const response = await postsProvider.deleteComment({
                idMe: user!._id,
                idComment: params.id,
            })
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Delete comment posts success !', data: response })
        } catch (error: any) {
            console.log(error)
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async likeComment({ user, params }: Request, res: Response) {
        try {
            const response = await postsProvider.likeComment({
                idComment: params.id,
                idMe: user!._id,
            })
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Like comment posts success !', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async dislikeComment({ user, params }: Request, res: Response) {
        try {
            const response = await postsProvider.dislikeComment({
                idComment: params.id,
                idMe: user!._id,
            })
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Dislike comment posts success !', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async commentChildren({ params, user }: Request, res: Response) {
        try {
            const response = await postsProvider.commentChildren({
                parentId: params.id,
                idMe: user!._id,
            })
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Comment posts success !', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async upload({ body, user }: Request, res: Response) {
        try {
            const response = await postsProvider.upload(body, user!._id)
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
            const page = Number(query.page) || 1
            const limit = Number(query.limit) || 12
            const response = await postsProvider.suggests(user!._id, { limit, page })
            return res.status(HttpStatus.OK).json({
                message: 'Get posts success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    // async checkLike({ params, user }: Request, res: Response) {
    //     try {
    //         const { userName } = user!
    //         const response = await postsProvider.checkLike(userName, params.id)
    //         return res.status(HttpStatus.OK).json({
    //             message: 'check like success',
    //             data: response,
    //         })
    //     } catch (error: any) {
    //         const err = isError(error)
    //         return res.status(err.httpStatus).json(err)
    //     }
    // }
    async deletePosts({ params, user }: Request, res: Response) {
        try {
            const response = await postsProvider.deletePosts(params.id, user!._id)
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Delete success', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async editPosts({ body, user }: Request, res: Response) {
        try {
            const response = await postsProvider.editPosts(body, user!._id)
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Edit success', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async usersLikePost({ params }: Request, res: Response) {
        try {
            const response = await postsProvider.usersLikePost(params.id)
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Get users like success', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
}
export default new PostsController()
