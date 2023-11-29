import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(8008);
}
bootstrap();
