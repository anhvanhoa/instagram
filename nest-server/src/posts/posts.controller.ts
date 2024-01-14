import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard';
import { JwtData } from 'src/auth/interface';
import { User } from 'src/user/decorators/user.decorator';
import { PostsService } from './posts.service';
import { IdPostsDto, PostsDto } from './dto/posts.dto';
import { CommentCreateDto } from './dto/create-comment.dto';
import { CommentDeleteDto } from './dto/delete-comment.dto';

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
    @Post('like')
    async like(@User() user: JwtData, @Body() idposts: IdPostsDto) {
        return await this.postsService.like(user.userName, idposts);
    }
    @Post('dislike')
    async dislike(@User() user: JwtData, @Body() idposts: IdPostsDto) {
        return await this.postsService.dislike(user.userName, idposts);
    }
    @Post('comment')
    async comment(@User() user: JwtData, @Body() comment: CommentCreateDto) {
        return await this.postsService.comment(user.userName, comment);
    }
    @Delete('comment')
    async deleteComment(
        @User() user: JwtData,
        @Body() comment: CommentDeleteDto
    ) {
        return await this.postsService.deleteComment(user.userName, comment);
    }
    @Get('suggests')
    async suggest(@User() user: JwtData, @Query('limit') limit: number) {
        return await this.postsService.suggests(user.userName, limit);
    }
}
