import { IsMongoId, IsString } from 'class-validator';

export class CommentDeleteDto {
    @IsMongoId()
    @IsString()
    idPosts: string;
    @IsMongoId()
    @IsString()
    idComment: string;
}
