import { CodeModel } from '~/models'
import { randomCode, sendMail } from '~/utils/Otp'
import { AuthService } from './Auth.service'
import { httpResponse } from '~/utils/HandleRes'
import { HttpStatus } from '~/http-status.enum'
import { Code } from '~/types/code'

export class OtpService extends AuthService {
    //
    public async signCode(email: string) {
        const code = randomCode(6)
        await CodeModel.create({ email, otp: code })
        this.deleteCode(code)
        await sendMail({ email, codeverify: code })
        return httpResponse(HttpStatus.OK, { msg: 'Send mail success' })
    }
    public async verifyCode(data: Omit<Code, '_id'>) {
        return await CodeModel.findOneAndDelete(data)
    }
    protected deleteCode(code: string) {
        setTimeout(
            async () => {
                await CodeModel.deleteOne({ otp: code })
            },
            1000 * 60 * 3,
        )
    }
}
const otpProvider = new OtpService()
export default otpProvider
