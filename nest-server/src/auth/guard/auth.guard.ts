import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtData } from '../interface/jwt-data.interface';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const {
            headers: { authorization },
        } = req;
        const token = authorization.split(' ')[1];
        try {
            const data = await this.jwtService.verifyAsync<JwtData>(token, {
                secret: this.configService.get('KEY_JWT'),
            });
            req['user'] = data;
            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
