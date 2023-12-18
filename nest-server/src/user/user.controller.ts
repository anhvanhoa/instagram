import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard';
import { User } from './decorators/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @UseGuards(AuthGuard)
    @Get('search')
    search(@Query('q') q: string, @User('userName') userName: string) {
        return this.userService.search(q, userName);
    }
}
