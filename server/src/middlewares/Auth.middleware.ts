import { NextFunction, Request, Response } from 'express';
import AuthService from '~/services/Auth.service';
import { Code } from '~/types';
import { resError } from '~/utils/HandleRes';
class AuthMiddleware {
    public async verifyOtp(req: Request, res: Response, next: NextFunction) {
        const data: Omit<Code, '_id'> = { email: req.body.email, otp: req.body.otp };
        if (!data.otp || !data.email) return res.status(400).json(resError('Data not valid !'));
        const dataRes = await AuthService.verifyCode(data);
        if (!dataRes) return res.status(400).json(resError('Otp not valid !'));
        return next();
    }
}

const authMiddleware = new AuthMiddleware();
const verifyOtp = authMiddleware.verifyOtp;

export { verifyOtp };
export default authMiddleware;
