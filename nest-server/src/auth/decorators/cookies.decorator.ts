import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Cookies = createParamDecorator<string, ExecutionContext>(
    (data, ctx) => {
        const { cookies } = ctx.switchToHttp().getRequest<Request>();
        return data ? cookies?.[data] : cookies;
    }
);
