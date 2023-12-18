import { JwtPayload } from 'jsonwebtoken';

export interface JwtData extends JwtPayload {
    userName: string;
}

export type TimeExpires = '120s' | '1h' | '7d';
