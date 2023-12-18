import {
    IsEmail,
    IsMobilePhone,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

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
export class LoginFBDto {
    @IsString()
    @IsNotEmpty()
    displayName: string;
    @IsOptional()
    @IsEmail()
    email: string | null;
    @IsOptional()
    @IsMobilePhone('vi-VN')
    phoneNumber: string | null;
    photoURL: string | null;
    @IsString()
    @IsNotEmpty()
    uid: string;
}
