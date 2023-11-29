import { NextFunction, Request, Response } from 'express';
import otpProvider from '~/services/Otp.service';
import { Code } from '~/types';
import { resError } from '~/utils/HandleRes';
class AuthMiddleware {
    public async verifyOtp(req: Request, res: Response, next: NextFunction) {
        const data: Omit<Code, '_id'> = { email: req.body.email, otp: req.body.otp };
        if (!data.otp || !data.email) return res.status(400).json(resError('Data not valid !'));
        const dataRes = await otpProvider.verifyCode(data);
        if (!dataRes) return res.status(400).json(resError('Otp not valid !'));
        return next();
    }
}

const authMiddleware = new AuthMiddleware();
export const verifyOtp = authMiddleware.verifyOtp;
export default authMiddleware;
