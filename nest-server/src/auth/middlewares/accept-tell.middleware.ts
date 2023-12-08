import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { isMobilePhone } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AcceptTell implements NestMiddleware {
    use(req: Request, _: Response, next: NextFunction) {
        const { numberPhone }: { numberPhone: string } = req.body;
        if (numberPhone || isMobilePhone(numberPhone, 'vi-VN')) {
            throw new HttpException('data not valid', HttpStatus.BAD_REQUEST);
        }
        next();
    }
}
