import { Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import chatProvider from '~/services/Chat.service'
import { isError } from '~/utils/Errors'

class ChatController {
    async users({ user }: Request, res: Response) {
        try {
            // Nếu user = undefined thì check trong middleware
            const response = await chatProvider.users(user!)
            return res.status(HttpStatus.OK).json({
                message: 'Get users chat success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async boxChat({ params }: Request, res: Response) {
        try {
            // Nếu user = undefined thì check trong middleware
            const idRoom = params.idRoom
            const response = await chatProvider.boxChat(idRoom)
            return res.status(HttpStatus.OK).json({
                message: 'Get box chat success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async roomChat({ params, user }: Request, res: Response) {
        try {
            // Nếu user = undefined thì check trong middleware
            const idUserChat = params.idUser
            const idRoom = await chatProvider.idRoom(idUserChat, user!._id)
            return res.status(200).json({
                message: 'Get room chat success',
                data: idRoom,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
}

export default new ChatController()
