import { PopulateOption } from 'mongoose'
import { HttpStatus } from '~/http-status.enum'
import CommentModel from '~/models/Comment.model'
import PostModel from '~/models/Post.model'
import UserModel from '~/models/User.model'
import { Post } from '~/type'
import { httpResponse } from '~/utils/HandleRes'

export class PostsService {
    async posts(userName: string) {
        const user = await UserModel.findOne({ userName })
        const idFollowing = user?.following
        if (!idFollowing || !idFollowing.length) return httpResponse(HttpStatus.OK, [])
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
        return httpResponse(HttpStatus.OK, posts)
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
                match: { _id: { $ne: user.data?._id } },
            })
        if (!posts) throw httpResponse(HttpStatus.NOT_FOUND, { msg: 'Not found' })
        return httpResponse(HttpStatus.OK, {
            ...posts._doc,
            like: user.data,
        })
    }
    async like(userName: string, { idPosts }: { idPosts: string }) {
        const author = await UserModel.findOne({ userName })
        if (!author) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        await PostModel.updateOne(
            { _id: idPosts, likes: { $nin: author._id } },
            { $push: { likes: author._id } },
        )
        return httpResponse(HttpStatus.OK, { msg: 'Like posts success !' })
    }
    async dislike(userName: string, { idPosts }: { idPosts: string }) {
        const author = await UserModel.findOne({ userName })
        if (!author) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        await PostModel.updateOne(
            { _id: idPosts, likes: { $in: author._id } },
            { $pull: { likes: author._id } },
        )
        return httpResponse(HttpStatus.OK, { msg: 'Dislike posts success !' })
    }
    async comment(
        userName: string,
        { idPosts, content }: { idPosts: string; content: string },
    ) {
        const author = await UserModel.findOne({ userName })
        if (!author) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        const comment = await CommentModel.create({
            content,
            userId: author._id,
        })
        await PostModel.updateOne(
            { _id: idPosts },
            {
                $push: {
                    comments: comment._id,
                },
            },
        )
        return httpResponse(HttpStatus.OK, { msg: 'Comment posts success !' })
    }
    async deleteComment(
        userName: string,
        { idPosts, idComment }: { idPosts: string; idComment: string },
    ) {
        const author = await UserModel.findOne({ userName })
        if (!author) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        await CommentModel.deleteOne({ _id: idComment, userId: author._id })
        await PostModel.updateOne(
            { _id: idPosts },
            {
                $pull: {
                    comments: idComment,
                },
            },
        )
        return httpResponse(HttpStatus.OK, { msg: 'Delete comment posts success !' })
    }
    async upload(posts: Omit<Post, '_id' | '_doc' | 'author'>, userName: string) {
        const author = await UserModel.findOne({ userName })
        if (!author) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        const post = await PostModel.create({ ...posts, author: author._id })
        await UserModel.updateOne(
            { _id: author._id },
            {
                $push: { posts: post._id },
            },
        )
        return httpResponse(HttpStatus.OK, post)
    }
    async suggests(userName: string, limit: number = 12) {
        const user = await UserModel.findOne({
            userName,
        })
        if (!user) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        const posts = await PostModel.find()
            .limit(limit)
            .ne('author', user?._id)
            .populate('author', { password: false })
            .sort({ createdAt: 'desc' })
        return httpResponse(HttpStatus.OK, posts)
    }
    async checkLike(userName: string, id: string) {
        const user = await UserModel.findOne({
            userName,
        })
        if (!user) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        const posts = await PostModel.findOne({
            _id: id,
            likes: { $in: user._id },
        })
        return httpResponse(HttpStatus.OK, posts ? user._doc : null)
    }
    async deletePosts(id: string, userName: string) {
        const user = await UserModel.findOne({
            userName,
        })
        if (!user) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        await PostModel.deleteOne({
            _id: id,
            author: user._id,
        })
        await UserModel.updateOne(
            { _id: user._id },
            {
                $pull: { posts: id },
            },
        )
        return httpResponse(HttpStatus.OK, { msg: 'Delete success' })
    }
    async editPosts(posts: Post, userName: string) {
        const user = await UserModel.findOne({
            userName,
        })
        if (!user) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        await PostModel.updateOne({ _id: posts._id }, posts)
        return httpResponse(HttpStatus.OK, { msg: 'Edit success' })
    }
}
const postsProvider = new PostsService()
export default postsProvider
