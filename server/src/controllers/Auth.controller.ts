import { Request, Response } from 'express-serve-static-core'
import authProvider from '~/services/Auth.service'
import { HttpStatus } from '~/http-status.enum'
import otpProvider from '~/services/Otp.service'
import isJWT from 'validator/lib/isJWT'
class AuthController {
    public async isInfo({ body }: Request, res: Response) {
        try {
            const response = await authProvider.infoUnique(body)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    public async signCode(req: Request, res: Response) {
        try {
            const email = req.body.email
            const response = await otpProvider.signCode(email)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    public async register({ body }: Request, res: Response) {
        try {
            if (!body.email && !body.numberPhone)
                return res.status(400).json({ msg: 'Data is not valid' })
            const response = await authProvider.register(body)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            console.log(error)
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    //
    public async loginFacebook({ body }: Request, res: Response) {
        try {
            const response = await authProvider.loginFacebook(body, (token) => {
                res.cookie('tokenRefresh', token, { httpOnly: true, sameSite: 'strict' })
            })
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    //
    public async login({ body }: Request, res: Response) {
        try {
            const response = await authProvider.login(body, (token) => {
                res.cookie('tokenRefresh', token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    path: '/',
                })
            })
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    //
    public async logout({ cookies }: Request, res: Response) {
        try {
            const { tokenRefresh }: { tokenRefresh: string } = cookies
            if (!tokenRefresh || !isJWT(tokenRefresh))
                return res
                    .status(HttpStatus.UNAUTHORIZED)
                    .json({ msg: 'Token not valid' })
            const response = await authProvider.logout(tokenRefresh)
            res.clearCookie('tokenRefresh')
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async refreshJwt({ cookies }: Request, res: Response) {
        try {
            const { tokenRefresh }: { tokenRefresh: string } = cookies
            if (!tokenRefresh || !isJWT(tokenRefresh))
                return res.status(HttpStatus.UNAUTHORIZED).json({ msg: 'Login please !' })
            const response = await authProvider.refreshJwt(tokenRefresh, (token) => {
                res.cookie('tokenRefresh', token, { httpOnly: true, sameSite: 'strict' })
            })
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

export default new AuthController()
