import { RegisterDto } from '~/services/types';
import { CodeModel, UserModel } from '~/models/index.model';
import { randomCode, sendMail } from '~/utils/Otp';
import { Code, Info, User } from '~/types';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
import isTell from 'validator/lib/isMobilePhone';

class AuthService {
    //
    public async infoUnique(data: Info) {
        let isCheck: boolean = false;
        if (data.email) {
            if (isEmail(data.email)) {
                const user = await UserModel.findOne({ email: data.email });
                isCheck = Boolean(user) ? false : true;
            }
            return isCheck ? { type: 'email', unique: true } : { type: 'email', unique: false };
        }
        if (data.numberPhone) {
            if (isTell(data.numberPhone)) {
                const user = await UserModel.findOne({ numberPhone: data.numberPhone });
                isCheck = Boolean(user) ? false : true;
            }
            return isCheck ? { type: 'tell', unique: true } : { type: 'tell', unique: false };
        }
        const user = await UserModel.findOne({ userName: data.userName });
        isCheck = Boolean(user) ? false : true;
        return isCheck ? { type: 'userName', unique: true } : { type: 'userName', unique: false };
    }
    //
    public async register(data: RegisterDto): Promise<User> {
        data.password = this.hashPassword(data.password);
        const user = await UserModel.create(data);
        return user;
    }
    //
    public async signCode(email: string) {
        const code = randomCode(6);
        await CodeModel.create({ email, otp: code });
        this.deleteCode(code);
        return await sendMail({ email, codeverify: code });
    }
    public async verifyCode(data: Omit<Code, '_id'>) {
        return await CodeModel.findOneAndDelete(data);
    }
    private hashPassword(password: string): string {
        const salt: number = 10;
        return bcrypt.hashSync(password, salt);
    }
    private deleteCode(code: string) {
        setTimeout(async () => {
            await CodeModel.deleteOne({ otp: code });
        }, 60000);
    }
}

export default new AuthService();
