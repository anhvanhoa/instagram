import { Request, Response } from 'express-serve-static-core';
import authProvider from '~/services/Auth.service';
import { HttpStatus } from '~/http-status.enum';
import otpProvider from '~/services/Otp.service';

class AuthController {
    public async isInfo({ body }: Request, res: Response) {
        try {
            const response = await authProvider.infoUnique(body);
            return res.status(response.httpStatus).json(response.data);
        } catch (error: any) {
            if (!error.httpStatus) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
            return res.status(error.httpStatus).json(error.data);
        }
    }
    public async signCode(req: Request, res: Response) {
        try {
            const email = req.body.email;
            const response = await otpProvider.signCode(email);
            return res.status(response.httpStatus).json(response.data);
        } catch (error: any) {
            if (!error.httpStatus) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
            return res.status(error.httpStatus).json(error.data);
        }
    }
    public async register({ body }: Request, res: Response) {
        try {
            const response = await authProvider.register(body);
            return res.status(response.httpStatus).json(response.data);
        } catch (error: any) {
            if (!error.httpStatus) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
            return res.status(error.httpStatus).json(error.data);
        }
    }
}

export default new AuthController();
