import {
    Body,
    Controller,
    FileTypeValidator,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guard';
import { ImagesService } from './images.service';
import { SizeCrop } from './dto/size-crop.dto';

@UseGuards(AuthGuard)
@Controller('image')
export class ImagesController {
    constructor(private imageService: ImagesService) {}
    @Post('upload')
    @UseInterceptors(FileInterceptor('images'))
    upload(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 4 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: 'image/*' })
                ]
            })
        )
        file: Express.Multer.File,
        @Body() body: SizeCrop
    ) {
        return this.imageService.crop(body, file);
    }
}
