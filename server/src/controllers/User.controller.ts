import { Request, Response } from 'express-serve-static-core'
import { HttpStatus } from '~/http-status.enum'
import userProvider from '~/services/User.service'
import { JwtyData } from '~/types'

class UserController {
    async search({ query, user }: Request, res: Response) {
        try {
            const q = query.q as string
            if (!user || !q)
                return res
                    .status(HttpStatus.UNAUTHORIZED)
                    .json({ msg: 'You are not authorized to access this resource' })
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
            const { userName } = user as JwtyData
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
            const { userName } = user as JwtyData
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
}

export default new UserController()
