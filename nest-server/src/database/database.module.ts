import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports: [
        RedisModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                config: {
                    password: configService.get('PASS_REDIS'),
                    host: configService.get('HOST_REDIS'),
                    port: configService.get('PORT_REDIS')
                }
            })
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('URL_MONGODB')
            })
        })
    ]
})
export class DatabaseModule {}
