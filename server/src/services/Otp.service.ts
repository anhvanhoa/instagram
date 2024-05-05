import { CodeModel } from '~/models'
import { randomCode, sendMail } from '~/utils/Otp'
import { AuthService } from './Auth.service'
import { Code } from '~/types/code'

export class OtpService extends AuthService {
    //
    public async signCode(email: string) {
        const code = randomCode(6)
        await CodeModel.create({ email, otp: code })
        this.deleteCode(code)
        return await sendMail({ email, codeverify: code })
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
