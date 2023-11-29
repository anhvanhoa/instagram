import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCodeDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}
