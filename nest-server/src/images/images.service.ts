import { Injectable } from '@nestjs/common';
import { SizeCrop } from './dto/size-crop.dto';
import Jimp from 'jimp';

@Injectable()
export class ImagesService {
    async crop({ height, width, x, y }: SizeCrop, file: Express.Multer.File) {
        const image = await Jimp.read(file.path);
        const widthImg = image.getWidth();
        const heightImg = image.getHeight();
        height = heightImg * height;
        width = widthImg * width;
        x = widthImg * x;
        y = heightImg * y;
        image.crop(x, y, width, height);
        await image.writeAsync(`${file.destination}/${file.filename}`);
        return file.filename;
    }
}
