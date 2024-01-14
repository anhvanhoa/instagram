import { IsNotEmpty, IsString } from 'class-validator';

export type Gender = 'nam' | 'nữ' | 'khác' | '';
export class UserUpdateDto {
    gender: Gender;
    fullName: string;
    avatar: string;
    birthday: string;
    bio: string;
}
