import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InfoDto, LoginDto, SignDto } from './dto';
import { JwtData, ResUser, TimeExpires } from './interface';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectRedis() private readonly redis: Redis,
        private configService: ConfigService,
        private jwt: JwtService,
    ) {}
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
                : await this.uniqueTell(data.numberPhone);
            if (isDup)
                return new HttpException('Duplicate', HttpStatus.BAD_REQUEST);
            data.password = await hash(data.password, 10);
            await this.userModel.create(data);
            return { message: 'Register success' };
        } catch (error) {
            if (error.code === 11000)
                throw new HttpException(
                    'Duplicate data',
                    HttpStatus.BAD_REQUEST,
                );
            throw new InternalServerErrorException('server');
        }
    }
    async login(data: LoginDto, setCookie: (token: string) => void) {
        const { email, numberPhone, userName, password } = data;
        if (!email && !numberPhone && !userName) {
            throw new HttpException(
                { msg: 'data not valid' },
                HttpStatus.BAD_GATEWAY,
            );
        }
        const user = await this.userModel
            .findOne<ResUser>({
                $or: [{ email }, { numberPhone }, { userName }],
            })
            .select({
                _id: false,
                fbId: false,
                createdAt: false,
                updatedAt: false,
            });
        if (!user)
            throw new HttpException(
                { msg: 'Login fail' },
                HttpStatus.UNAUTHORIZED,
            );
        const { password: passHash, ...resUser } = user._doc;
        const isPass = await compare(password, passHash);
        if (!isPass)
            throw new HttpException(
                { msg: 'Login fail' },
                HttpStatus.UNAUTHORIZED,
            );
        const dataJwt = { userName: resUser.userName };
        const accessToken = this.signToken(dataJwt, '120s');
        const refreshToken = this.signToken(dataJwt, '7d');
        await this.redis.set(resUser.userName, refreshToken);
        setCookie(refreshToken);
        resUser['accessToken'] = accessToken;
        return resUser;
    }
    private signToken(data: JwtData, time: TimeExpires) {
        return this.jwt.sign(data, {
            secret: process.env.KEY_JWT,
            expiresIn: time,
        });
    }
    async logout(token: string) {
        const data = this.jwt.verify<JwtData>(token, {
            secret: this.configService.get('KEY_JWT'),
        });
        await this.redis.del(data.userName);
        return { msg: 'Logout success' };
    }
}
