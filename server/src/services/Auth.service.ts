import { RegisterDto } from '~/services/types';
import { CodeModel, UserModel } from '~/models/index.model';
import { randomCode, sendMail } from '~/utils/Otp';
import { Code, Info, User } from '~/types';
import { hash } from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
import isTell from 'validator/lib/isMobilePhone';
import { HttpStatus } from '~/http-status.enum';
import { isNotEmptyObject } from '~/utils/Validate';
import { httpResponse } from '~/utils/HandleRes';

export class AuthService {
    //
    async uniqueEmail(email: string): Promise<boolean> {
        if (!isEmail(email)) throw httpResponse(HttpStatus.BAD_REQUEST, { msg: 'Email not is valid' });
        return Boolean(await UserModel.findOne({ email }, { email: 1 }));
    }
    //
    async uniqueTell(tell: string): Promise<boolean> {
        if (!isTell(tell, 'vi-VN')) throw httpResponse(HttpStatus.BAD_REQUEST, { msg: 'Number phone not is valid' });
        return Boolean(await UserModel.findOne({ tell }, { tell: 1 }));
    }
    //
    async uniqueUsername(userName: string): Promise<boolean> {
        if (!/^[^\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/.test(userName))
            throw httpResponse(HttpStatus.BAD_REQUEST, { msg: 'Username not is valid' });
        return Boolean(await UserModel.findOne({ userName }, { userName: 1 }));
    }
    //
    async infoUnique(data: Info) {
        if (isNotEmptyObject(data)) throw httpResponse(HttpStatus.BAD_REQUEST, { msg: 'Data is not valid' });
        if (data.email) {
            const unique = await this.uniqueEmail(data.email);
            return httpResponse(HttpStatus.OK, { type: 'email', unique });
        }
        if (data.numberPhone) {
            const unique = await this.uniqueTell(data.numberPhone);
            return httpResponse(HttpStatus.OK, { type: 'tell', unique });
        }
        if (data.userName) {
            const unique = await this.uniqueUsername(data.userName);
            return httpResponse(HttpStatus.OK, { type: 'userName', unique });
        }
        throw httpResponse(HttpStatus.INTERNAL_SERVER_ERROR, { msg: 'Server error' });
    }
    //
    async register(data: RegisterDto) {
        if (data.email && (await this.uniqueEmail(data.email)))
            throw httpResponse(HttpStatus.BAD_REQUEST, { msg: 'Email not valid !' });
        if (data.numberPhone && (await this.uniqueTell(data.numberPhone)))
            throw httpResponse(HttpStatus.BAD_REQUEST, { msg: 'Tell or Tell not valid !' });
        data.password = await hash(data.password, 10);
        const user = await UserModel.create(data);
        return httpResponse(HttpStatus.OK, { msg: 'Register success', userName: user.userName });
    }
    //
}
const authProvider = new AuthService();
export default authProvider;
