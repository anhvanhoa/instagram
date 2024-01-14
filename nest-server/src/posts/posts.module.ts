import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from './schema/posts.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Comment, CommentSchema } from './schema/comment.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Posts.name, schema: PostsSchema },
            { name: User.name, schema: UserSchema },
            { name: Comment.name, schema: CommentSchema }
        ])
    ],
    providers: [PostsService],
    controllers: [PostsController]
})
export class PostsModule {}
