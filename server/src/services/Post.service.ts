import { PopulateOption } from 'mongoose'
import CommentModel from '~/models/Comment.model'
import PostModel from '~/models/Post.model'
import UserModel from '~/models/User.model'
import { Post } from '~/types/post'
import { UserNoPassword } from '~/types/user'
import { BadRequestError } from '~/utils/Errors'

export class PostsService {
    async posts(user: UserNoPassword) {
        const idFollowing = user?.following
        const userFollowing = (
            await UserModel.find({ _id: { $in: idFollowing } }).select({
                _id: true,
            })
        ).map((item) => item._id)
        const posts = await PostModel.find({
            author: { $in: userFollowing },
            likes: { $nin: [user._id] },
        })
            .populate({
                path: 'author',
                model: 'user', // Tên của mô hình người dùng
                select: { password: false },
                populate: {
                    path: 'posts',
                    model: 'post', // Tên của mô hình Posts
                },
            })
            .sort({ createdAt: 'desc' })
        return posts
    }
    async getOnePosts(id: string, userName: string) {
        const user = await this.checkLike(userName, id)
        const posts = await PostModel.findOne({ _id: id })
            .populate({
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'userId',
                    model: 'user',
                    populate: {
                        path: 'posts',
                        model: 'post',
                    },
                },
            })
            .populate({
                path: 'author',
                model: 'user',
                select: { password: false },
                populate: {
                    path: 'posts',
                    model: 'post', // Tên của mô hình Posts
                },
            })
            .populate<PopulateOption>({
                path: 'likes',
                model: 'user',
                select: { _id: true },
                match: { _id: { $ne: user?._id } },
            })
        if (!posts)
            throw new BadRequestError({
                message: 'Post not found',
            })
        return {
            ...posts._doc,
            like: user,
        }
    }
    async like(userName: string, { idPosts }: { idPosts: string }) {
        const author = await UserModel.findOne({ userName })
        if (!author) throw new BadRequestError({ message: 'Unauthorized' })
        return await PostModel.updateOne(
            { _id: idPosts, likes: { $nin: author._id } },
            { $push: { likes: author._id } },
        )
    }
    async dislike(userName: string, { idPosts }: { idPosts: string }) {
        const author = await UserModel.findOne({ userName })
        if (!author) throw new BadRequestError({ message: 'Unauthorized' })
        return await PostModel.updateOne(
            { _id: idPosts, likes: { $in: author._id } },
            { $pull: { likes: author._id } },
        )
    }
    async comment(
        userName: string,
        { idPosts, content }: { idPosts: string; content: string },
    ) {
        const author = await UserModel.findOne({ userName })
        if (!author) throw new BadRequestError({ message: 'Unauthorized' })
        const comment = await CommentModel.create({
            content,
            userId: author._id,
        })
        return await PostModel.updateOne(
            { _id: idPosts },
            {
                $push: {
                    comments: comment._id,
                },
            },
        )
    }
    async deleteComment(
        userName: string,
        { idPosts, idComment }: { idPosts: string; idComment: string },
    ) {
        const author = await UserModel.findOne({ userName })
        if (!author) throw new BadRequestError({ message: 'Unauthorized' })
        await CommentModel.deleteOne({ _id: idComment, userId: author._id })
        return await PostModel.updateOne(
            { _id: idPosts },
            {
                $pull: {
                    comments: idComment,
                },
            },
        )
    }
    async upload(posts: Omit<Post, '_id' | '_doc' | 'author'>, userName: string) {
        const author = await UserModel.findOne({ userName })
        if (!author) throw new BadRequestError({ message: 'Unauthorized' })
        const post = await PostModel.create({ ...posts, author: author._id })
        await UserModel.updateOne(
            { _id: author._id },
            {
                $push: { posts: post._id },
            },
        )
        return post
    }
    async suggests(userName: string, limit: number = 12) {
        const user = await UserModel.findOne({
            userName,
        })
        if (!user) throw new BadRequestError({ message: 'Unauthorized' })
        const posts = await PostModel.find()
            .limit(limit)
            .ne('author', user?._id)
            .populate('author', { password: false })
            .sort({ createdAt: 'desc' })
        return posts
    }
    async checkLike(userName: string, id: string) {
        const user = await UserModel.findOne({
            userName,
        })
        if (!user) throw new BadRequestError({ message: 'Unauthorized' })

        const posts = await PostModel.findOne({
            _id: id,
            likes: { $in: user._id },
        })
        return posts ? user._doc : null
    }
    async deletePosts(id: string, userName: string) {
        const user = await UserModel.findOne({
            userName,
        })
        if (!user) throw new BadRequestError({ message: 'Unauthorized' })
        await PostModel.deleteOne({
            _id: id,
            author: user._id,
        })
        return await UserModel.updateOne(
            { _id: user._id },
            {
                $pull: { posts: id },
            },
        )
    }
    async editPosts(posts: Post, userName: string) {
        const user = await UserModel.findOne({
            userName,
        })
        if (!user) throw new BadRequestError({ message: 'Unauthorized' })
        return await PostModel.updateOne({ _id: posts._id }, posts)
    }
}
const postsProvider = new PostsService()
export default postsProvider
