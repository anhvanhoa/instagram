import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { verifyOtp } from './middlewares/verify-otp.middleware';
import { OtpModule } from 'src/otp/otp.module';
import { OtpService } from 'src/otp/otp.service';
import { Code, CodeSchema } from 'src/otp/schema/code.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Code.name, schema: CodeSchema },
        ]),
        OtpModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, OtpService],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(verifyOtp).forRoutes('auth/register');
    }
}
