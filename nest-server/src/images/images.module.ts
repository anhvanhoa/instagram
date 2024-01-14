import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { MulterModule } from '@nestjs/platform-express';
import { storage, filter } from './config';

@Module({
    imports: [
        MulterModule.register({
            storage: storage,
            fileFilter: filter
        })
    ],
    controllers: [ImagesController],
    providers: [ImagesService]
})
export class ImagesModule {}
