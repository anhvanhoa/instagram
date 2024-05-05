import { Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import notificationProvider from '~/services/Notification.service'
import { isError } from '~/utils/Errors'

class NotifyController {
    async notification({ user }: Request, res: Response) {
        try {
            const response = await notificationProvider.getNotify(user!)
            return res.status(HttpStatus.OK).json({
                message: 'Get notification success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
}

export default new NotifyController()
