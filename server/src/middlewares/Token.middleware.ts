import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'
import isJWT from 'validator/lib/isJWT'
import { HttpStatus } from '~/http-status.enum'
import { UserModel } from '~/models'
import TokenModel from '~/models/Token.model'
import { JwtData, SocketIo } from '~/type'
import Token from '~/utils/Token'

class TokenMiddleware {
    async accuracy(req: Request, res: Response, next: NextFunction) {
        try {
            const { authorization } = req.headers
            if (!authorization)
                return res
                    .status(HttpStatus.UNAUTHORIZED)
                    .json({ msg: 'You are not authorized to access this resource.' })
            const token = authorization.split(' ')[1]
            const { userName } = Token.verifyToken<JwtData>(token)
            const {
                _doc: { password, ...user },
            } = (await UserModel.findOne({ userName }))!
            req.user = user
            next()
        } catch (error) {
            if (error instanceof JsonWebTokenError)
                return res.status(401).json({
                    httpStatus: 401,
                    msg: 'Token not valid !',
                })
            return res.status(500).json(error)
        }
    }
    async verifyRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken || !isJWT(refreshToken))
                return res
                    .status(HttpStatus.UNAUTHORIZED)
                    .json({ msg: 'Token is not valid' })
            const tokenDb = await TokenModel.findOne({ token: refreshToken })
            if (!tokenDb) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    httpStatus: HttpStatus.UNAUTHORIZED,
                    msg: 'Token is not valid',
                })
            }
            const { userName } = Token.verifyToken<JwtData>(refreshToken)
            await TokenModel.findOneAndDelete({ token: refreshToken })
            const {
                _doc: { password, ...user },
            } = (await UserModel.findOne({ userName }).populate('posts'))!
            req.user = user
            next()
        } catch (error) {
            if (error instanceof JsonWebTokenError)
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    httpStatus: HttpStatus.UNAUTHORIZED,
                    msg: 'Token not valid & please login again',
                })
            return res.status(500).json(error)
        }
    }
    async accuracySocket(socket: SocketIo, next: (err?: Error) => void) {
        try {
            const token = socket.handshake.auth.token as string | undefined
            if (!token) return next(new Error('token not valid'))
            const { userName } = Token.verifyToken<JwtData>(token)
            const {
                _doc: { password, ...user },
            } = (await UserModel.findOne({ userName }))!
            socket.data = user
            next()
        } catch (error) {
            if (error instanceof JsonWebTokenError) next(new Error('token not valid'))
            next(new Error('server error'))
        }
    }
}

const tokenMiddleware = new TokenMiddleware()
export const { accuracy, verifyRefreshToken, accuracySocket } = tokenMiddleware
export default tokenMiddleware
