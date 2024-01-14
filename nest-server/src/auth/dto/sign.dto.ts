import { IsNotEmpty, Matches } from 'class-validator';

export class SignDto {
    // @IsOptional()
    // @IsEmail()
    // @IsString()
    email?: string;
    // @IsOptional()
    // @IsMobilePhone('vi-VN')
    numberPhone?: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    @Matches(/^[^\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, {
        message: 'username not valid'
    })
    userName: string;
    @IsNotEmpty()
    fullName: string;
    @IsNotEmpty()
    birthday: string;
}
