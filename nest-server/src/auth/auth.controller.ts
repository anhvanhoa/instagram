import {
    Controller,
    Post,
    Body,
    BadRequestException,
    HttpStatus,
    HttpCode,
    Res,
    UseGuards,
    HttpException,
} from '@nestjs/common';
import {
    isEmail,
    isJWT,
    isMobilePhone,
    isNotEmpty,
    isNotEmptyObject,
} from 'class-validator';
import { AuthService } from './auth.service';
import { CreateCodeDto, InfoDto, LoginDto, LoginFBDto, SignDto } from './dto';
import { OtpService } from 'src/otp/otp.service';
import { Response } from 'express';
import { AuthGuard } from './guard';
import { Cookies } from './decorators';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private otpService: OtpService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('unique-info')
    async isInfo(@Body() body: InfoDto) {
        if (!isNotEmptyObject(body))
            throw new BadRequestException('Data not valid !');
        return await this.authService.infoUnique(body);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('sign-otp')
    async signCode(@Body() { email }: CreateCodeDto) {
        return await this.otpService.signCode(email);
    }

    @Post('firebase-register')
    @Post('register')
    async register(@Body() data: SignDto) {
        const { email, numberPhone } = data;
        if (isNotEmpty(email) && isNotEmpty(numberPhone))
            throw new BadRequestException('Data is not valid');
        if (email && !isEmail(email))
            throw new BadRequestException("This is'nt email");
        if (numberPhone && !isMobilePhone(numberPhone, 'vi-VN'))
            throw new BadRequestException("This is'nt tell");
        return this.authService.register(data);
    }

    @Post('login')
    @HttpCode(200)
    async login(
        @Body() body: LoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.login(body, (token) => {
            res.cookie('tokenRefresh', token, {
                httpOnly: true,
                sameSite: 'strict',
            });
        });
    }
    @Post('login-facebook')
    async loginFacebook(
        @Body() body: LoginFBDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.loginFacebook(body, (token) => {
            res.cookie('tokenRefresh', token, {
                httpOnly: true,
                sameSite: 'strict',
            });
        });
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    @HttpCode(200)
    async logout(
        @Cookies('tokenRefresh') tokenRefresh: string,
        @Res({ passthrough: true }) { clearCookie }: Response,
    ) {
        if (!tokenRefresh || !isJWT(tokenRefresh))
            throw new HttpException(
                { msg: 'Token not valid' },
                HttpStatus.UNAUTHORIZED,
            );
        this.authService.logout(tokenRefresh);
        clearCookie('tokenRefresh');
        return tokenRefresh;
    }
}
