import { CourierClient } from '@trycourier/courier';
import { Template, configMail } from '~/config/sendMail';
import { httpResponse } from './HandleRes';
import { HttpStatus } from '~/http-status.enum';
class Otp {
    public randomCode(len: number): string {
        let code: string = '';
        for (let index = 0; index < len; index++) {
            code += Math.floor(Math.random() * 9);
        }
        return code;
    }
    async sendMail(data: { codeverify: string; email: string }, template: string = Template.REGISTER): Promise<void> {
        try {
            const courier = CourierClient(configMail);
            await courier.send({
                message: {
                    to: {
                        email: data.email,
                    },
                    template,
                    data,
                },
            });
        } catch (error) {
            throw httpResponse(HttpStatus.INTERNAL_SERVER_ERROR, { msg: 'Server mail error' });
        }
    }
}
const otp = new Otp();
const randomCode = otp.randomCode;
const sendMail = otp.sendMail;
export { randomCode, sendMail };
export default otp;
