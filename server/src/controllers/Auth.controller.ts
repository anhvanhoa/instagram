import { Request, Response } from 'express'
import authProvider from '~/services/Auth.service'
import { HttpStatus } from '~/http-status.enum'
import otpProvider from '~/services/Otp.service'
import isJWT from 'validator/lib/isJWT'
import { Info } from '~/types/register'
import envConfig from '~/config/env'
import { httpResponse } from '~/utils/HandleRes'
class AuthController {
    async isInfo({ body }: Request, res: Response) {
        try {
            const response = await authProvider.infoUnique(body as Info)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            if (!error.httpStatus)
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Server error' })
            return res.status(error.httpStatus).json(error.data)
        }
    }
    async signCode(req: Request, res: Response) {
        try {
            const email = req.body.email
            if (!email || (await authProvider.uniqueEmail(email)))
                throw httpResponse(HttpStatus.BAD_REQUEST, { msg: 'Email not valid!' })
            const response = await otpProvider.signCode(email)
            return res.status(response.httpStatus).json(response)
        } catch (error: any) {
            return res.status(error.httpStatus).json(error)
        }
    }
    async register({ body }: Request, res: Response) {
        try {
            const response = await authProvider.register(body)
            return res.status(response.httpStatus).json(response.data)
        } catch (error: any) {
            return res.status(error.httpStatus).json(error.data)
        }
    }
    //
    public async login({ body }: Request, res: Response) {
        try {
            const response = await authProvider.login(body)
            const { refreshToken, ...data } = response.data
            res.cookie('refreshToken', refreshToken, {
                secure: true,
                sameSite: 'none',
                httpOnly: true,
                domain: envConfig.DOMAIN,
                path: '/',
            })
            return res.status(response.httpStatus).json(data)
        } catch (error: any) {
            return res.status(error.httpStatus).json(error)
        }
    }
    //
    public async logout({ cookies }: Request, res: Response) {
        try {
            const refreshToken = cookies.refreshToken
            if (!refreshToken || !isJWT(refreshToken))
                return res.status(HttpStatus.UNAUTHORIZED).json({ msg: 'Login please !' })
            const response = await authProvider.logout(refreshToken)
            res.clearCookie('refreshToken', {
                httpOnly: true,
                domain: envConfig.DOMAIN,
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
    async refreshJwt({ user }: Request, res: Response) {
        try {
            // Nếu user = undefined thì check trong middleware
            const response = await authProvider.refreshJwt(user!)
            res.cookie('refreshToken', response.data.refreshToken, {
                secure: true,
                sameSite: 'none',
                httpOnly: true,
                domain: envConfig.DOMAIN,
                path: '/',
            })
            return res.status(response.httpStatus).json({
                ...user,
                accessToken: response.data.accessToken,
            })
        } catch (error: any) {
            return res.status(error.httpStatus).json(error.data)
        }
    }
}

export default new AuthController()
