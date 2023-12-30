import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from './schema/posts.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Posts.name, schema: PostsSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}
