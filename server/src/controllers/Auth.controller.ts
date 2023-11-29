import { Request, Response } from 'express-serve-static-core';
import { resSuccess, resError } from '~/utils/HandleRes';
import AuthService from '~/services/Auth.service';
import { Info } from '~/types';
class AuthController {
    public async isInfo(req: Request, res: Response) {
        try {
            const dataReq: Info = req.body;
            if (!dataReq.email && !dataReq.numberPhone && !dataReq.userName)
                return res.status(400).json(resSuccess('Not find information'));
            const isUnique = await AuthService.infoUnique(req.body);
            return res.status(200).json(isUnique);
        } catch (error) {
            return res.status(200).json(resError('Server error', error));
        }
    }
    public async signCode(req: Request, res: Response) {
        try {
            const email = req.body.email;
            if (!email) return res.status(400).json(resError('Not find email !'));
            await AuthService.signCode(req.body.email);
            return res.status(200).json(resSuccess('Send mail success'));
        } catch (error) {
            res.status(500).json(resError('Server error', error));
        }
    }
    public async register(req: Request, res: Response) {
        try {
            if (!req.body.email || !req.body.numberPhone)
                return res.status(400).json(resError('Email or Tell not valid !'));
            await AuthService.register(req.body);
            return res.status(200).json(resSuccess('Sign success'));
        } catch (error) {
            res.status(500).json(resError('Server error', error));
        }
    }
}

export default new AuthController();
