import {
    IsEmail,
    IsMobilePhone,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator';

export class InfoDto {
    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;
    @IsOptional()
    @IsString()
    @IsMobilePhone('vi-VN')
    numberPhone: string;
    @IsOptional()
    @IsString()
    @Matches(/^[^\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, {
        message: 'username not valid',
    })
    userName: string;
}
