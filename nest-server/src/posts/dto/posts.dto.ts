import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostsDto {
    @IsOptional()
    @IsString()
    title: string;
    @IsNotEmpty()
    contents: string[];
}
