import Jimp from 'jimp'
import { PopulateOption } from 'mongoose'
import { HttpStatus } from '~/http-status.enum'
import CommentModel from '~/models/Comment.model'
import PostsModel from '~/models/Posts.model'
import UserModel from '~/models/User.model'
import { Posts, SizeCrop } from '~/types'
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
        const posts = await PostsModel.find({
            author: { $in: userFollowing },
            likes: { $nin: [user._id] },
        })
            .populate({
                path: 'author',
                model: 'users', // Tên của mô hình người dùng
                select: { password: false },
                populate: {
                    path: 'posts',
                    model: 'posts', // Tên của mô hình Posts
                },
            })
            .sort({ createdAt: 'desc' })
        return httpResponse(HttpStatus.OK, posts)
    }
    async getOnePosts(id: string, userName: string) {
        const user = await this.checkLike(userName, id)
        const posts = await PostsModel.findOne({ _id: id })
            .populate({
                path: 'comments',
                model: 'comments',
                populate: {
                    path: 'userId',
                    model: 'users',
                    populate: {
                        path: 'posts',
                        model: 'posts',
                    },
                },
            })
            .populate({
                path: 'author',
                model: 'users',
                select: { password: false },
                populate: {
                    path: 'posts',
                    model: 'posts', // Tên của mô hình Posts
                },
            })
            .populate<PopulateOption>({
                path: 'likes',
                model: 'users',
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
        await PostsModel.updateOne(
            { _id: idPosts, likes: { $nin: author._id } },
            { $push: { likes: author._id } },
        )
        return httpResponse(HttpStatus.OK, { msg: 'Like posts success !' })
    }
    async dislike(userName: string, { idPosts }: { idPosts: string }) {
        const author = await UserModel.findOne({ userName })
        if (!author) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        await PostsModel.updateOne(
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
        await PostsModel.updateOne(
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
        await PostsModel.updateOne(
            { _id: idPosts },
            {
                $pull: {
                    comments: idComment,
                },
            },
        )
        return httpResponse(HttpStatus.OK, { msg: 'Delete comment posts success !' })
    }
    async upload(posts: Omit<Posts, '_id' | '_doc' | 'author'>, userName: string) {
        const author = await UserModel.findOne({ userName })
        if (!author) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        const post = await PostsModel.create({ ...posts, author: author._id })
        await UserModel.updateOne(
            { _id: author._id },
            {
                $push: { posts: post._id },
            },
        )
        return httpResponse(HttpStatus.OK, { msg: 'create posts success !' })
    }
    async crop({ height, width, x, y }: SizeCrop, file?: Express.Multer.File) {
        if (!file) throw httpResponse(HttpStatus.FORBIDDEN, { msg: 'Forbidden' })
        if (!height || !width || !x || !y)
            return httpResponse(HttpStatus.OK, file.filename)
        const image = await Jimp.read(file.path)
        const widthImg = image.getWidth()
        const heightImg = image.getHeight()
        height = heightImg * Number(height)
        width = widthImg * Number(width)
        x = widthImg * Number(x)
        y = heightImg * Number(y)
        image.crop(x, y, width, height)
        await image.writeAsync(`${file.destination}/${file.filename}`)
        return httpResponse(HttpStatus.OK, file.filename)
    }
    async suggests(userName: string, limit: number = 12) {
        const user = await UserModel.findOne({
            userName,
        })
        if (!user) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        const posts = await PostsModel.find()
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
        const posts = await PostsModel.findOne({
            _id: id,
            likes: { $in: user._id },
        })
        return httpResponse(HttpStatus.OK, posts ? user._doc : null)
    }
}
const postsProvider = new PostsService()
export default postsProvider
