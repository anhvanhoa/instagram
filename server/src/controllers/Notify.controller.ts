import { Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import notificationProvider from '~/services/Notification.service'
import { JwtData } from '~/types'

class NotifyController {
    async notification({ user }: Request, res: Response) {
        try {
            const { userName } = user as JwtData
            const response = await notificationProvider.getNotify(userName)
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

export default new NotifyController()
