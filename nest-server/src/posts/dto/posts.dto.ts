import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostsDto {
    @IsOptional()
    @IsString()
    title: string;
    @IsNotEmpty()
    contents: string[];
}

export class IdPostsDto {
    @IsNotEmpty()
    @IsMongoId()
    idPosts: string;
}
