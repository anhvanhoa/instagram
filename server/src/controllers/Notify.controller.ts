import { Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import notificationProvider from '~/services/Notification.service'

class NotifyController {
    async notification({ user }: Request, res: Response) {
        try {
            const response = await notificationProvider.getNotify(user!.userName)
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
