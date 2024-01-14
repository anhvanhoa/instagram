import { IsNotEmpty, IsNumberString } from 'class-validator';

export class SizeCrop {
    @IsNotEmpty()
    @IsNumberString()
    height: number;
    @IsNotEmpty()
    @IsNumberString()
    width: number;
    @IsNotEmpty()
    @IsNumberString()
    x: number;
    @IsNotEmpty()
    @IsNumberString()
    y: number;
}
