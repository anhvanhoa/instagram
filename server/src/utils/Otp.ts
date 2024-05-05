import { CourierClient } from '@trycourier/courier'
import { Template, configMail } from '~/config/sendMail'
class Otp {
    public randomCode(len: number): string {
        let code: string = ''
        for (let index = 0; index < len; index++) {
            code += Math.floor(Math.random() * 9)
        }
        return code
    }
    async sendMail(
        data: { codeverify: string; email: string },
        template: string = Template.REGISTER,
    ) {
        const courier = CourierClient(configMail)
        return courier.send({
            message: {
                to: {
                    email: data.email,
                },
                template,
                data,
            },
        })
    }
}
const otp = new Otp()
export const { randomCode, sendMail } = otp
export default otp
