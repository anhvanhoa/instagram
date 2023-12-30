import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard';
import { JwtData } from 'src/auth/interface';
import { User } from 'src/user/decorators/user.decorator';
import { PostsService } from './posts.service';
import { PostsDto } from './dto/posts.dto';

@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}
    @Get()
    async posts(@User() user: JwtData) {
        return await this.postsService.posts(user.userName);
    }
    @Post('upload')
    async upload(@User() user: JwtData, @Body() posts: PostsDto) {
        return await this.postsService.upload(user.userName, posts);
    }
}
