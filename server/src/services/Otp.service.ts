import { CodeModel } from '~/models/index.model';
import { randomCode, sendMail } from '~/utils/Otp';
import { Code } from '~/types';
import { AuthService } from './Auth.service';
import { httpResponse } from '~/utils/HandleRes';
import { HttpStatus } from '~/http-status.enum';

export class OtpService extends AuthService {
    //
    public async signCode(email: string) {
        if (await this.uniqueEmail(email)) throw httpResponse(HttpStatus.BAD_REQUEST, { msg: 'Email not valid!' });
        const code = randomCode(6);
        await CodeModel.create({ email, otp: code });
        this.deleteCode(code);
        await sendMail({ email, codeverify: code });
        return httpResponse(HttpStatus.OK, { msg: 'Send mail success' });
    }
    public async verifyCode(data: Omit<Code, '_id'>) {
        return await CodeModel.findOneAndDelete(data);
    }
    protected deleteCode(code: string) {
        setTimeout(async () => {
            await CodeModel.deleteOne({ otp: code });
        }, 60000);
    }
}
const otpProvider = new OtpService();
export default otpProvider;
