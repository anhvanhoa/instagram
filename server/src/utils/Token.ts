import jwt, { JwtPayload } from 'jsonwebtoken';
class Token {
    private key: string = 'AnhVanHoa';
    public createToken(payload: JwtPayload, expiresIn: string = '120s') {
        return jwt.sign(payload, this.key, {
            expiresIn,
        });
    }
    protected verifyToken(token: string) {
        return jwt.verify(token, this.key);
    }
}

export default new Token();
