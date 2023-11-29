import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class OtpDto {
    @IsNotEmpty()
    @Length(6)
    otp: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
