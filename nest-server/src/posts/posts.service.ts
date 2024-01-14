import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PopulateOption } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Posts } from './schema/posts.schema';
import { IdPostsDto, PostsDto } from './dto/posts.dto';
import { Comment } from './schema/comment.schema';
import { CommentCreateDto } from './dto/create-comment.dto';
import { CommentDeleteDto } from './dto/delete-comment.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Posts.name) private postsModel: Model<Posts>,
        @InjectModel(Comment.name) private commentModel: Model<Comment>
    ) {}
    async posts(userName: string) {
        const user = await this.userModel.findOne({ userName });
        const idFollowing = user.following;
        const userFollowing = (
            await this.userModel.find({ _id: { $in: idFollowing } }).select({
                _id: true
            })
        ).map((item) => item._id);
        const posts = await this.postsModel
            .find({
                author: { $in: userFollowing },
                likes: { $nin: [user._id] }
            })
            .populate<PopulateOption>({
                path: 'author',
                model: 'User',
                select: { password: false },
                populate: {
                    path: 'posts',
                    model: 'Posts'
                }
            });
        return posts;
    }

    async upload(userName: string, postsData: PostsDto) {
        const author = await this.userModel.findOne({ userName });
        const posts = await this.postsModel.create({
            ...postsData,
            author: author._id
        });
        await this.userModel.updateOne(
            { _id: author._id },
            {
                $push: { posts: posts._id }
            }
        );
        return { msg: 'create posts success !' };
    }
    async like(userName: string, { idPosts }: IdPostsDto) {
        const author = await this.userModel.findOne({ userName });
        await this.postsModel.updateOne(
            { _id: idPosts, likes: { $nin: author._id } },
            { $push: { likes: author._id } }
        );
        return { msg: 'Like posts success !' };
    }
    async dislike(userName: string, { idPosts }: { idPosts: string }) {
        const author = await this.userModel.findOne({ userName });
        await this.postsModel.updateOne(
            { _id: idPosts, likes: { $in: author._id } },
            { $pull: { likes: author._id } }
        );
        return { msg: 'Dislike posts success !' };
    }
    async comment(userName: string, { idPosts, content }: CommentCreateDto) {
        const author = await this.userModel.findOne({ userName });
        const comment = await this.commentModel.create({
            content,
            userId: author._id
        });
        await this.postsModel.updateOne(
            { _id: idPosts },
            {
                $push: {
                    comments: comment._id
                }
            }
        );
        return { msg: 'Comment posts success !' };
    }
    async deleteComment(
        userName: string,
        { idPosts, idComment }: CommentDeleteDto
    ) {
        const author = await this.userModel.findOne({ userName });
        await this.commentModel.deleteOne({
            _id: idComment,
            userId: author._id
        });
        await this.postsModel.updateOne(
            { _id: idPosts },
            {
                $pull: {
                    comments: idComment
                }
            }
        );
        return {
            msg: 'Delete comment posts success !'
        };
    }
    async suggests(userName: string, limit: number = 12) {
        const user = await this.userModel.findOne({
            userName
        });
        const posts = await this.postsModel
            .find()
            .limit(limit)
            .ne('author', user._id)
            .populate('author', { password: false });
        return posts;
    }
}
