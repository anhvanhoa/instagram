import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { VerifyOtp } from './middlewares/verify-otp.middleware';
import { OtpModule } from 'src/otp/otp.module';
import { OtpService } from 'src/otp/otp.service';
import { Code, CodeSchema } from 'src/otp/schema/code.schema';
import { JwtModule } from '@nestjs/jwt';
import { AcceptTell } from './middlewares/accept-tell.middleware';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Code.name, schema: CodeSchema },
        ]),
        JwtModule.register({}),
        OtpModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, OtpService],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(VerifyOtp).forRoutes('auth/register');
        consumer.apply(AcceptTell).forRoutes('auth/firebase-register');
    }
}
