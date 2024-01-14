import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { join } from 'path'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['log', 'error', 'warn'],
        cors: { origin: 'http://localhost:3000', credentials: true },
        bodyParser: true,
    })
    app.useStaticAssets(join(__dirname, '../public'))
    app.use(cookieParser())
    app.setGlobalPrefix('api')
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(8008)
}
bootstrap()
