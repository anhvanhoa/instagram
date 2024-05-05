import { Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import userProvider from '~/services/User.service'
import { isError } from '~/utils/Errors'

class UserController {
    async search({ query, user }: Request, res: Response) {
        try {
            const q = query.q as string
            if (!q) return res.status(HttpStatus.OK).json([])
            const { userName } = user!
            const response = await userProvider.search(q, userName)
            return res.status(HttpStatus.OK).json({
                message: 'Search users success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async userUpdate({ body, user }: Request, res: Response) {
        try {
            const { userName } = user!
            await userProvider.userUpdate(userName, body)
            return res.status(HttpStatus.OK).json({ message: 'Update success' })
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
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async user({ params: { username } }: Request, res: Response) {
        try {
            const response = await userProvider.user(username)
            return res.status(HttpStatus.OK).json({
                message: 'Get user success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async follow({ body, user }: Request, res: Response) {
        try {
            const idFollow: string = body.idFollow
            const { userName } = user!
            await userProvider.follow(idFollow, userName)
            return res.status(HttpStatus.OK).json({ message: 'Follow success !' })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async unfollow({ body, user }: Request, res: Response) {
        try {
            const idFollow: string = body.idFollow
            const { userName } = user!
            await userProvider.unfollow(idFollow, userName)
            return res.status(HttpStatus.OK).json({ message: 'Unfollow success !' })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async info({ user, params }: Request, res: Response) {
        try {
            const { userName } = user!
            const response = await userProvider.info(userName, params.username)
            return res.status(HttpStatus.OK).json({
                message: 'Get info success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async suggest({ user, query }: Request, res: Response) {
        try {
            const limit = Number(query.limit ?? 5)
            const { userName } = user!
            const response = await userProvider.suggest(userName, limit)
            return res.status(HttpStatus.OK).json({
                message: 'Get users success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
}

export default new UserController()
