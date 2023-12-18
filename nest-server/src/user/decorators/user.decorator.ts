import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtData } from 'src/auth/interface';

export const User = createParamDecorator<keyof JwtData, ExecutionContext>(
    (data, ctx) => {
        const { user } = ctx.switchToHttp().getRequest<{ user: JwtData }>();
        return data ? user[data] : user;
    },
);
