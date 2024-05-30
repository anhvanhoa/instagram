import { Request, Response } from 'express'
import authProvider from '~/services/Auth.service'
import { HttpStatus } from '~/http-status.enum'
import otpProvider from '~/services/Otp.service'
import isJWT from 'validator/lib/isJWT'
import { Info } from '~/types/register'
import envConfig from '~/config/env'
import { BadRequestError, isError, UnauthorizedError } from '~/utils/Errors'
import { ResponseMessage } from '~/types/common'
class AuthController {
    async isInfo({ body }: Request, res: Response) {
        try {
            const response = await authProvider.infoUnique(body as Info)
            return res.status(HttpStatus.OK).json({
                message: 'Get info success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async signCode(req: Request, res: Response) {
        try {
            const email = req.body.email
            if (!email || (await authProvider.uniqueEmail(email)))
                throw new BadRequestError({
                    message: 'Email not is valid',
                })
            await otpProvider.signCode(email)
            const response: ResponseMessage = {
                message: 'Send mail success',
            }
            return res.status(HttpStatus.OK).json(response)
        } catch (error: any) {
            return res.status(error.httpStatus).json(error)
        }
    }
    async register({ body }: Request, res: Response) {
        try {
            const response = await authProvider.register(body)
            return res.status(HttpStatus.OK).json({
                message: 'Register success',
                data: response,
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    //
    public async login({ body }: Request, res: Response) {
        try {
            const response = await authProvider.login(body)
            const { refreshToken, user } = response
            res.cookie('refreshToken', refreshToken, {
                secure: true,
                sameSite: 'none',
                httpOnly: true,
                domain: envConfig.DOMAIN,
                path: '/',
            })
            res.status(HttpStatus.OK).json({
                message: 'Login success',
                data: user,
            })
        } catch (error: any) {
            const err = isError(error)
            res.status(err.httpStatus).json(err)
        }
    }
    //
    public async logout({ cookies }: Request, res: Response) {
        try {
            const refreshToken = cookies.refreshToken
            if (!refreshToken || !isJWT(refreshToken))
                throw new UnauthorizedError({
                    message: 'Login please !',
                })
            await authProvider.logout(refreshToken)
            res.clearCookie('refreshToken', {
                httpOnly: true,
                domain: envConfig.DOMAIN,
            })
            return res.status(HttpStatus.OK).json({
                message: 'Logout success',
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async refreshJwt({ user }: Request, res: Response) {
        try {
            // Nếu user = undefined thì check trong middleware
            const { accessToken, refreshToken, counts } = await authProvider.refreshJwt(
                user!,
            )
            res.cookie('refreshToken', refreshToken, {
                secure: true,
                sameSite: 'none',
                httpOnly: true,
                domain: envConfig.DOMAIN,
                path: '/',
            })
            return res.status(HttpStatus.OK).json({
                message: 'Refresh success',
                data: {
                    ...user,
                    ...counts,
                    accessToken: accessToken,
                },
            })
        } catch (error: any) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
}

export default new AuthController()
