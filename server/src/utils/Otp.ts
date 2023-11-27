import { CourierClient } from '@trycourier/courier';
import { Template, configMail } from '~/config/sendMail';
class Otp {
    public randomCode(len: number): string {
        let code: string = '';
        for (let index = 0; index < len; index++) {
            code += Math.floor(Math.random() * 9);
        }
        return code;
    }
    async sendMail(data: { codeverify: string; email: string }, template: string = Template.REGISTER): Promise<string> {
        const courier = CourierClient(configMail);
        const { requestId } = await courier.send({
            message: {
                to: {
                    email: data.email,
                },
                template,
                data,
            },
        });
        return requestId;
    }
}
const otp = new Otp();
const randomCode = otp.randomCode;
const sendMail = otp.sendMail;
export { randomCode, sendMail };
export default otp;
