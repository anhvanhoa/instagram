import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Code } from './schema/code.schema';
import { CourierClient } from '@trycourier/courier';
import { Template } from './mail.config';

Injectable();
export class OtpService {
    constructor(@InjectModel(Code.name) private codeModel: Model<Code>) {}
    randomCode(len: number) {
        let code: string = '';
        for (let index = 0; index < len; index++) {
            code += Math.floor(Math.random() * 9);
        }
        return code;
    }
    private async sendMail(
        data: { codeverify: string; email: string },
        template: string = Template.REGISTER
    ): Promise<void> {
        try {
            const { email, codeverify } = data;
            const courier = new CourierClient({
                authorizationToken: process.env.KEY_SEND_MAIL
            });
            await courier.send({
                message: {
                    to: { email },
                    template,
                    data: { codeverify }
                }
            });
        } catch (error) {
            throw new InternalServerErrorException('server');
        }
    }
    private deleteCode(otp: string) {
        setTimeout(async () => {
            await this.codeModel.deleteOne({ otp });
        }, 30000);
    }
    async signCode(email: string) {
        try {
            const code = this.randomCode(6);
            await this.codeModel.create({ email, otp: code });
            this.deleteCode(code);
            await this.sendMail({ email, codeverify: code });
            return { message: 'Send mail success' };
        } catch (error) {
            throw new InternalServerErrorException('server');
        }
    }
}
