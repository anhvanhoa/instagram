import { JwtPayload, verify, sign } from 'jsonwebtoken'
import envConfig from '~/config/env'
type TimeExpires = '120s' | '1h' | '7d' | string
interface JwtData extends JwtPayload {
    userName: string
}
class Token {
    createToken(payload: JwtData, expiresIn: TimeExpires = '120s') {
        const key = envConfig.JWT_KEY
        return sign(payload, key, {
            expiresIn,
        })
    }
    verifyToken<T = JwtPayload>(token: string) {
        const key = envConfig.JWT_KEY
        return verify(token, key) as T
    }
}

export default new Token()
