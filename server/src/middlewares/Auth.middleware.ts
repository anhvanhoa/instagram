import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import otpProvider from '~/services/Otp.service'
import { Code } from '~/types/code'
import { BadRequestError, isError } from '~/utils/Errors'
class AuthMiddleware {
    public async verifyOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const data: Omit<Code, '_id'> = { email: req.body.email, otp: req.body.otp }
            if (!data.otp || (!data.email && !data.numberPhone)) {
                throw new BadRequestError({
                    message: 'Data not valid !',
                })
            }
            const dataRes = await otpProvider.verifyCode(data)
            if (!dataRes)
                throw new BadRequestError({
                    message: 'OTP not valid !',
                })
            return next()
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    public async acceptTell({ body }: Request, res: Response, next: NextFunction) {
        if (body.numberPhone) return next()
        return res.status(HttpStatus.BAD_REQUEST).json({ msg: 'Data not valid !' })
    }
}

const authMiddleware = new AuthMiddleware()
export const { acceptTell, verifyOtp } = authMiddleware
export default authMiddleware
