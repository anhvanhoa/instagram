import { IsNotEmpty } from 'class-validator';
import { JwtPayload } from 'jsonwebtoken';

export class JwtData implements JwtPayload {
    @IsNotEmpty()
    userName: string;
}

export type TimeExpires = '120s' | '1h' | '7d' | '30s';
