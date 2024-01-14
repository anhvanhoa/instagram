import { Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import chatProvider from '~/services/Chat.service'
import { JwtData } from '~/types'

class ChatController {
    async users({ user }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await chatProvider.users(userName)
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
    async boxChat({ params, user }: Request, res: Response) {
        try {
            const idUserChat = params.id
            const { userName } = user as JwtData
            const response = await chatProvider.boxChat(userName, idUserChat)
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

export default new ChatController()
