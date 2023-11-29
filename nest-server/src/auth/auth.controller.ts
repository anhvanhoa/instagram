import {
    Controller,
    Post,
    Body,
    BadRequestException,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { InfoDto } from './dto/info.dto';
import { CreateCodeDto } from './dto/create-code.dto';
import { SignDto } from './dto/sign.dto';
import { isNotEmpty, isNotEmptyObject } from 'class-validator';
import { OtpService } from 'src/otp/otp.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private otpService: OtpService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('unique-info')
    async isIfo(@Body() body: InfoDto) {
        if (!isNotEmptyObject(body))
            throw new BadRequestException('Data not valid !');
        return await this.authService.infoUnique(body);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('sign-otp')
    async signCode(@Body() { email }: CreateCodeDto) {
        return await this.otpService.signCode(email);
    }

    @Post('register')
    async register(@Body() data: SignDto) {
        const { email, numberPhone } = data;
        if (isNotEmpty(email) && isNotEmpty(numberPhone))
            throw new BadRequestException('Data not enough');
        return this.authService.register(data);
    }
}
