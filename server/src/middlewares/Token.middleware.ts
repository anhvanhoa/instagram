import { NextFunction, Request, Response } from 'express'
import isJWT from 'validator/lib/isJWT'
import { UserModel } from '~/models'
import TokenModel from '~/models/Token.model'
import { SocketIo } from '~/types/socket'
import {
    isError,
    isJsonWebTokenError,
    ServerRequestError,
    UnauthorizedError,
} from '~/utils/Errors'
import Token, { JwtData } from '~/utils/Token'

class TokenMiddleware {
    async accuracy(req: Request, res: Response, next: NextFunction) {
        try {
            const { authorization } = req.headers
            if (!authorization)
                throw new UnauthorizedError({
                    message: 'You are not authorized to access this resource.',
                })
            const token = authorization.split(' ')[1]
            const { userName } = Token.verifyToken<JwtData>(token)
            const {
                _doc: { password, ...user },
            } = (await UserModel.findOne({ userName }))!
            req.user = user
            next()
        } catch (error) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async verifyRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken || !isJWT(refreshToken))
                throw new UnauthorizedError({
                    message: 'Token is not valid',
                })
            const tokenDb = await TokenModel.findOne({ token: refreshToken })
            if (!tokenDb) {
                throw new UnauthorizedError({
                    message: 'Token is not valid',
                })
            }
            const { userName } = Token.verifyToken<JwtData>(refreshToken)
            await TokenModel.findOneAndDelete({ token: refreshToken })
            const {
                _doc: { password, ...user },
            } = (await UserModel.findOne({ userName }))!
            req.user = user
            next()
        } catch (error) {
            const err = isError(error)
            return res.status(err.httpStatus).json(err)
        }
    }
    async accuracySocket(socket: SocketIo, next: (err?: Error) => void) {
        try {
            const token = socket.handshake.auth.token as string | undefined
            if (!token)
                return next(
                    new UnauthorizedError({
                        message: 'Token is not valid',
                    }),
                )
            const { userName } = Token.verifyToken<JwtData>(token)
            const {
                _doc: { password, ...user },
            } = (await UserModel.findOne({ userName }))!
            socket.data = user
            next()
        } catch (error) {
            if (isJsonWebTokenError(error)) next(new Error('token not valid'))
            next(new ServerRequestError({ message: 'unknown', errors: error }))
        }
    }
}

const tokenMiddleware = new TokenMiddleware()
export const { accuracy, verifyRefreshToken, accuracySocket } = tokenMiddleware
export default tokenMiddleware
