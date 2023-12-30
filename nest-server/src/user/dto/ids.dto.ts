import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class IdsDto {
    @IsNotEmpty()
    @IsMongoId()
    idFollow: string;
}
