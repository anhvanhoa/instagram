import { Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import userProvider from '~/services/User.service'
import { isError } from '~/utils/Errors'

class UserController {
    async search({ query, user }: Request, res: Response) {
        try {
            const q = query.q as string
            if (!q)
                return res.status(HttpStatus.OK).json({
                    message: 'Search users success',
                    data: {
                        count_users: 0,
                        users: [],
                    },
                })
            const userName = user!.userName
            const response = await userProvider.search(q, userName)
            return res.status(HttpStatus.OK).json({
                message: 'Search users success',
                data: {
                    count_users: response.length,
                    users: response,
                },
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async userUpdate({ body, user }: Request, res: Response) {
        try {
            const response = await userProvider.userUpdate(
                {
                    idMe: user!._id,
                    avatar: user!.avatar,
                },
                body,
            )
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Update success', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async profile({ user }: Request, res: Response) {
        try {
            const { _id } = user!
            const response = await userProvider.profile(_id)
            return res.status(HttpStatus.OK).json({
                message: 'Get profile success',
                data: {
                    ...response,
                    ...user,
                },
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async user({ params, user }: Request, res: Response) {
        try {
            const response = await userProvider.user({
                idMe: user!._id,
                userName: params.username,
            })
            return res.status(HttpStatus.OK).json({
                message: 'Get user success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async block({ body, user }: Request, res: Response) {
        try {
            const idUserBlock: string = body.idUserBlock
            const response = await userProvider.block(idUserBlock, user!._id)
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Block user success !', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async unblock({ body, user }: Request, res: Response) {
        try {
            const idUserBlock: string = body.idUserBlock
            const response = await userProvider.unblock(idUserBlock, user!._id)
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Unblock user success !', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async follow({ body, user }: Request, res: Response) {
        try {
            const idFollow: string = body.idFollow
            const response = await userProvider.follow(idFollow, user!._id)
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Follow success !', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async unfollow({ body, user }: Request, res: Response) {
        try {
            const idFollow: string = body.idFollow
            const response = await userProvider.unfollow(idFollow, user!._id)
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Unfollow success !', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async suggest({ user, query }: Request, res: Response) {
        try {
            const limit = Number(query.limit ?? 5)
            const response = await userProvider.suggest(user!._id, limit)
            res.header('X-Total-Count', response.length.toString())
            return res.status(HttpStatus.OK).json({
                message: 'Get users success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async removeFollower({ params, user }: Request, res: Response) {
        try {
            const response = await userProvider.removeFollower({
                idMe: user!._id,
                userId: params.id,
            })
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Remove follower success', data: response })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async checkUser({ params }: Request, res: Response) {
        try {
            const response = await userProvider.checkUser(params.username)
            return res.status(HttpStatus.OK).json({
                message: 'Check user success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async follower({ params }: Request, res: Response) {
        try {
            const response = await userProvider.followers({
                userName: params.username,
            })
            return res.status(HttpStatus.OK).json({
                message: 'Get follower success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async following({ params }: Request, res: Response) {
        try {
            const response = await userProvider.following({
                userName: params.username,
            })
            return res.status(HttpStatus.OK).json({
                message: 'Get follower success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async showManyFollowersOrFollowing({ body, user }: Request, res: Response) {
        try {
            const response = await userProvider.showManyFollowersOrFollowing({
                idMe: user!._id,
                ids: body,
            })
            return res.status(HttpStatus.OK).json({
                message: 'Get followers or following success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
}

export default new UserController()
