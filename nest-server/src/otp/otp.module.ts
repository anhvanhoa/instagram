import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Code, CodeSchema } from './schema/code.schema';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Code.name, schema: CodeSchema, collection: 'users' },
        ]),
    ],
    providers: [OtpService],
    exports: [OtpService],
})
export class OtpModule {}
