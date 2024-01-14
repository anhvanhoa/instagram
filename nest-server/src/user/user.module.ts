import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Posts, PostsSchema } from 'src/posts/schema/posts.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Posts.name, schema: PostsSchema }
        ])
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
