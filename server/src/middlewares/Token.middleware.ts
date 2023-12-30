import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '~/http-status.enum'
import { JwtyData } from '~/types'
import Token from '~/utils/Token'

class TokenMiddleware {
    accuracy(req: Request, res: Response, next: NextFunction) {
        const { headers } = req
        const { authorization } = headers
        if (!authorization)
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json({ msg: 'You are not authorized to access this resource.' })
        const token = authorization.split(' ')[1]
        Token.verifyToken(token, (error, data) => {
            if (error)
                return res
                    .status(HttpStatus.UNAUTHORIZED)
                    .json({ msg: 'You did not authenticate successfully' })
            else {
                req.user = data as JwtyData
                next()
            }
        })
    }
}

const tokenMiddleware = new TokenMiddleware()
const accuracy = tokenMiddleware.accuracy
export { accuracy }
export default new TokenMiddleware()
