import { JwtPayload, verify, sign, JsonWebTokenError } from 'jsonwebtoken'
type TimeExpires = '120s' | '1h' | '7d'
interface JwtData extends JwtPayload {
    userName: string
}
class Token {
    createToken(payload: JwtData, expiresIn: TimeExpires = '120s') {
        const key = process.env.JWT_KEY
        if (!key) throw Error('Hash key error')
        return sign(payload, key, {
            expiresIn,
        })
    }
    verifyToken(token: string, cb: (error: JsonWebTokenError | null, data: JwtData) => void) {
        const key = process.env.JWT_KEY
        if (!key) throw Error('Hash key error')
        verify(token, key, (error, data) => cb(error, data as JwtData))
    }
}

export default new Token()
