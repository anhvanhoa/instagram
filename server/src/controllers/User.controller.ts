import { Request, Response } from 'express-serve-static-core'
import { HttpStatus } from '~/http-status.enum'
import userProvider from '~/services/User.service'
import { JwtData } from '~/types'

class UserController {
    async search({ query, user }: Request, res: Response) {
        try {
            const q = query.q as string
            if (!user)
                return res
                    .status(HttpStatus.UNAUTHORIZED)
                    .json({ msg: 'You are not authorized to access this resource' })
            if (!q) return res.status(HttpStatus.OK).json([])
            const { userName } = user as { userName: string }
            const response = await userProvider.search(q, userName)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async userUpdate({ body, user }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await userProvider.userUpdate(userName, body)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async userCurrent({ params: { id }, user }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await userProvider.userCurrent(id, userName)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async user({ params: { username } }: Request, res: Response) {
        try {
            const response = await userProvider.user(username)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async follow({ body, user }: Request, res: Response) {
        try {
            const idFollow: string = body.idFollow
            const { userName } = user as JwtData
            const response = await userProvider.follow(idFollow, userName)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }

    async unfollow({ body, user }: Request, res: Response) {
        try {
            const idFollow: string = body.idFollow
            const { userName } = user as JwtData
            const response = await userProvider.unfollow(idFollow, userName)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async info({ user, params }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await userProvider.info(userName, params.username)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async suggest({ user }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await userProvider.suggest(userName)
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

export default new UserController()
