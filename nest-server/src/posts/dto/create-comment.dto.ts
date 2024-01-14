import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CommentCreateDto {
    @IsNotEmpty()
    @IsMongoId()
    idPosts: string;
    @IsNotEmpty()
    @IsString()
    content: string;
}
