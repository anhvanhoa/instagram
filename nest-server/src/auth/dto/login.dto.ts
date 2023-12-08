import { IsEmail, IsMobilePhone, IsOptional } from 'class-validator';

export class LoginDto {
    @IsOptional()
    userName?: string;
    @IsOptional()
    @IsMobilePhone('vi-VN')
    numberPhone?: string;
    @IsOptional()
    @IsEmail()
    email?: string;
    password: string;
}
