import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { OtpModule } from './otp/otp.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true,
            cache: true,
        }),
        JwtModule.register({
            global: true,
        }),
        DatabaseModule,
        AuthModule,
        OtpModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
