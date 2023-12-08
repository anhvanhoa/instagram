import {
    BadRequestException,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { OtpDto } from '../dto';
import { Code } from 'src/otp/schema/code.schema';

@Injectable()
export class VerifyOtp implements NestMiddleware {
    constructor(@InjectModel(Code.name) private codeModel: Model<Code>) {}
    async use(req: Request, _: Response, next: NextFunction) {
        const { otp, email }: OtpDto = req.body;
        if (otp && !(await this.codeModel.findOne({ otp, email })))
            throw new BadRequestException('OTP not valid');
        next();
    }
}
