import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import otpProvider from '~/services/Otp.service'
import { Code } from '~/types/code'
import { httpResponse } from '~/utils/HandleRes'
class AuthMiddleware {
    public async verifyOtp(req: Request, res: Response, next: NextFunction) {
        const data: Omit<Code, '_id'> = { email: req.body.email, otp: req.body.otp }
        if (!data.otp || (!data.email && !data.numberPhone))
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(httpResponse(HttpStatus.BAD_REQUEST, { msg: 'Data not valid !' }))
        const dataRes = await otpProvider.verifyCode(data)
        if (!dataRes)
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(httpResponse(HttpStatus.BAD_REQUEST, { msg: 'Otp not valid !' }))
        return next()
    }
    public async acceptTell({ body }: Request, res: Response, next: NextFunction) {
        if (body.numberPhone) return next()
        return res.status(HttpStatus.BAD_REQUEST).json({ msg: 'Data not valid !' })
    }
}

const authMiddleware = new AuthMiddleware()
export const verifyOtp = authMiddleware.verifyOtp
export const acceptTell = authMiddleware.acceptTell
export default authMiddleware
