import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { InfoDto } from './dto/info.dto';
import { SignDto } from './dto/sign.dto';
import { hash } from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    private async uniqueEmail(email: string): Promise<boolean> {
        return Boolean(await this.userModel.findOne({ email }, { email }));
    }
    private async uniqueTell(numberPhone: string): Promise<boolean> {
        return Boolean(await this.userModel.findOne({ numberPhone }));
    }
    private async uniqueUsername(userName: string): Promise<boolean> {
        return Boolean(await this.userModel.findOne({ userName }));
    }
    async infoUnique(data: InfoDto) {
        try {
            if (data.email) {
                const unique = await this.uniqueEmail(data.email);
                return { type: 'email', unique };
            }
            if (data.numberPhone) {
                const unique = await this.uniqueTell(data.numberPhone);
                return { type: 'tell', unique };
            }
            const unique = await this.uniqueUsername(data.userName);
            return { type: 'userName', unique };
        } catch (error) {
            throw new InternalServerErrorException('server');
        }
    }
    async register(data: SignDto) {
        try {
            const isDup = data.email
                ? await this.uniqueEmail(data.email)
                : await this.uniqueEmail(data.numberPhone);
            if (isDup)
                return new HttpException('Duplicate', HttpStatus.BAD_REQUEST);
            data.password = await hash(data.password, 10);
            await this.userModel.create(data);
            return { message: 'Register success' };
        } catch (error) {
            if (error.code === 11000)
                throw new HttpException('Duplicate', HttpStatus.BAD_REQUEST);
            throw new InternalServerErrorException('server');
        }
    }
}
