import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard';
import { User } from './decorators/user.decorator';
import { UserService } from './user.service';
import { IdsDto } from './dto/ids.dto';
import { JwtData } from 'src/auth/interface';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('search')
    search(@Query('q') q: string, @User('userName') userName: string) {
        return this.userService.search(q, userName);
    }
    @Get(':username')
    user(@Param('username') username: string) {
        return this.userService.user(username);
    }
    @Post('follow')
    @HttpCode(200)
    follow(@Body() ids: IdsDto, @User() user: JwtData) {
        return this.userService.follow(ids, user.userName);
    }
    @HttpCode(200)
    @Post('unfollow')
    unfollow(@Body() ids: IdsDto, @User() user: JwtData) {
        return this.userService.unfollow(ids, user.userName);
    }
}
