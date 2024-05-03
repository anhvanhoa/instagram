import { Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import chatProvider from '~/services/Chat.service'

class ChatController {
    async users({ user }: Request, res: Response) {
        try {
            // Nếu user = undefined thì check trong middleware
            const response = await chatProvider.users(user!)
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
    async boxChat({ params }: Request, res: Response) {
        try {
            // Nếu user = undefined thì check trong middleware
            const idRoom = params.idRoom
            const response = await chatProvider.boxChat(idRoom)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async roomChat({ params, user }: Request, res: Response) {
        try {
            // Nếu user = undefined thì check trong middleware
            const idUserChat = params.idUser
            const idRoom = await chatProvider.idRoom(idUserChat, user!._id)
            return res.status(200).json(idRoom)
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
