import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Posts } from './schema/posts.schema';
import { PostsDto } from './dto/posts.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Posts.name) private postsModel: Model<Posts>,
    ) {}
    async posts(userName: string) {
        const user = await this.userModel.findOne({ userName });
        const idFollowing = user.following;
        const userFollowing = (
            await this.userModel.find({ _id: { $in: idFollowing } }).select({
                _id: true,
            })
        ).map((item) => item._id);
        return await this.postsModel.find({ author: { $in: userFollowing } });
    }

    async upload(userName: string, posts: PostsDto) {
        const author = await this.userModel.findOne({ userName });
        return await this.postsModel.create({ ...posts, author: author._id });
    }
}
