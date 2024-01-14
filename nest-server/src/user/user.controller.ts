import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common'
import { AuthGuard } from 'src/auth/guard'
import { User } from './decorators/user.decorator'
import { UserService } from './user.service'
import { IdsDto } from './dto/ids.dto'
import { JwtData } from 'src/auth/interface'
import { UserUpdateDto } from './dto/user-update.dto'

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('search')
    search(@Query('q') q: string, @User('userName') userName: string) {
        return this.userService.search(q, userName)
    }
    @Get('suggest')
    suggest(@Query('limit') limit: number, @User() user: JwtData) {
        return this.userService.suggest(user.userName, limit)
    }
    @Patch('update')
    userUpdate(@Body() data: UserUpdateDto, @User() user: JwtData) {
        return this.userService.userUpdate(user.userName, data)
    }
    @Get('current/:id')
    @HttpCode(200)
    userCurrent(@Param('id') id: string, @User() user: JwtData) {
        return this.userService.userCurrent(id, user.userName)
    }
    @Post('follow')
    @HttpCode(200)
    follow(@Body() ids: IdsDto, @User() user: JwtData) {
        return this.userService.follow(ids, user.userName)
    }
    @HttpCode(200)
    @Post('unfollow')
    unfollow(@Body() ids: IdsDto, @User() user: JwtData) {
        return this.userService.unfollow(ids, user.userName)
    }
    @Get(':username')
    user(@Param('username') username: string) {
        return this.userService.user(username)
    }
    @Get(':username/info')
    userInfo(@Param('username') username: string, @User() user: JwtData) {
        return this.userService.info(user.userName, username)
    }
}
