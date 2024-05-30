import { PopulateOption } from 'mongoose'
import CommentModel from '~/models/Comment.model'
import LikeModel from '~/models/Like.model'
import PostModel from '~/models/Post.model'
import UserModel, { selectUserBase } from '~/models/User.model'
import UserFollowModel from '~/models/UserFollow.model'
import { CommentUserIdToSchema, PostsCreate, ResponseComment } from '~/types/comment'
import { Post, PostAuthor, ResponsePost, UserBase } from '~/types/post'
import { UserNoPassword } from '~/types/user'
import { BadRequestError, NotFoundError } from '~/utils/Errors'
import { convertUserIdToUser } from '~/utils/helpers'
import userProvider from './User.service'
import BlockModel from '~/models/Block.model'

export class PostsService {
    async posts(user: UserNoPassword) {
        const postIdLikes = await LikeModel.find({
            user: user._id,
        })
            .select({ postId: true })
            .transform((doc) => doc.map((doc) => doc.postId))
        const meBlock = await BlockModel.find({
            user: user._id,
        })
            .select({ userBlock: true })
            .transform((doc) => doc.map((doc) => doc.userBlock))
        const blockByUser = await BlockModel.find({
            userBlock: user._id,
        })
            .select({ user: true })
            .transform((doc) => doc.map((doc) => doc.user))
        const block = meBlock.concat(blockByUser)
        const userFollowing = await UserFollowModel.find({ followers: user._id })
            .select({
                user: true,
            })
            .transform((doc) => doc.map((doc) => doc.user.toString()))
            .exec()
        const posts = await PostModel.find({
            author: { $in: userFollowing, $nin: block },
            _id: { $nin: postIdLikes },
        })
            .populate({
                path: 'author',
                model: 'user',
                select: selectUserBase,
            })
            .sort({ createdAt: 'desc' })
            .transform(async (doc) => {
                const posts = []
                for (const post of doc) {
                    const postId = post._id.toString()
                    const commentTotal = await this.countComment(postId)
                    const likeTotal = await this.countLike({
                        id: postId,
                        type: 'post',
                    })
                    const isLike = await this.checkLike(user._id, postId)
                    posts.push({
                        ...post.toObject(),
                        likeTotal,
                        commentTotal: commentTotal,
                        isLike,
                        comments: [],
                    })
                }
                return posts as ResponsePost[]
            })
        return posts
    }
    async postsUser({
        username,
        idMe,
    }: {
        idMe: string
        username: string
        limit?: number
        page?: number
    }) {
        const author = await UserModel.findOne({ userName: username })
            .select({ _id: true })
            .exec()
        if (!author) throw new NotFoundError({ message: 'User not found' })
        const { blockByUser, isBlock } = await userProvider.checkBlock(
            author._id.toString(),
            idMe,
        )
        if (isBlock || blockByUser) return []
        const posts = await PostModel.find({
            author: author._id,
        })
            .sort({ createdAt: 'desc' })
            .transform(async (doc) => {
                const posts = []
                for (const post of doc) {
                    const postId = post._id.toString()
                    const commentTotal = await this.countComment(postId)
                    const likeTotal = await this.countLike({
                        id: postId,
                        type: 'post',
                    })
                    const isLike = await this.checkLike(idMe, postId)
                    posts.push({
                        ...post.toObject(),
                        likeTotal,
                        commentTotal: commentTotal,
                        isLike,
                        comments: [],
                    })
                }
                return posts as ResponsePost[]
            })
        return posts
    }
    async getPost(postId: string, idMe: string) {
        // Lấy bài đăng
        const { _doc: post } = await PostModel.findOne({ _id: postId })
            .populate({
                path: 'author',
                model: 'user',
                select: selectUserBase,
            })
            .transform(async (post) => {
                // Xử lý lỗi nếu post = null
                if (!post) throw new NotFoundError({ message: 'Post not found' })
                return post as unknown as PostAuthor
            })
            .exec()
        const isLike = await this.checkLike(idMe, postId)
        // Xử lý comments
        const comments = await this.comments({
            idMe,
            postId: postId,
        })
        // Xử lý số lượng comments
        let commentTotal = comments.length
        commentTotal += comments.reduce((acc, item) => acc + item.countChildren, 0)
        // Xử lý số lượng likes
        const likeTotal = await LikeModel.find({
            postId,
        })
            .countDocuments()
            .exec()
        const author = post.author as any as UserBase
        const { blockByUser, isBlock } = await userProvider.checkBlock(author._id, idMe)
        if (isBlock || blockByUser) return author.userName
        // Trả về kết quả
        return {
            ...post,
            likeTotal,
            commentTotal,
            comments,
            isLike,
            replies: [],
        }
    }
    async like({ postId, idMe }: { postId: string; idMe: string }) {
        const post = await PostModel.findOne({ _id: postId })
        if (!post) throw new NotFoundError({ message: 'Post not found' })
        await LikeModel.create({
            postId,
            user: idMe,
        })
        return postId
    }
    async dislike({ postId, idMe }: { postId: string; idMe: string }) {
        const post = await PostModel.findOne({ _id: postId })
        if (!post) throw new NotFoundError({ message: 'Post not found' })
        await LikeModel.deleteOne({
            postId,
            user: idMe,
        })
        return postId
    }
    async createComment(
        { idMe, postId }: { idMe: string; postId: string },
        body: PostsCreate,
    ) {
        const post = await PostModel.findOne({ _id: postId, isDelete: false })
        if (!post) throw new NotFoundError({ message: 'Post not found' })
        const comment = await CommentModel.create({
            user: idMe,
            postId: postId,
            ...body,
        })
        const result = await CommentModel.findOne<CommentUserIdToSchema>({
            _id: comment._id,
        })
            .populate<PopulateOption>({
                path: 'user',
                model: 'user',
                select: selectUserBase,
            })
            .exec()
        return {
            ...result?._doc,
            countChildren: 0,
            replies: [],
        }
    }
    async commentDisablePost({
        postId,
        idMe,
        commentDisable,
    }: {
        idMe: string
        postId: string
        commentDisable: boolean
    }) {
        await PostModel.findOneAndUpdate(
            {
                _id: postId,
                author: idMe,
            },
            {
                $set: {
                    commentDisable,
                },
            },
        )
        const comment = await this.getPost(postId, idMe)
        return comment
    }
    async deleteComment({ idComment, idMe }: { idMe: string; idComment: string }) {
        const comment = await CommentModel.deleteOne({
            _id: idComment,
            user: idMe,
        })
            .orFail(new NotFoundError({ message: 'Comment not found' }))
            .exec()
        return comment.deletedCount
    }
    async comments({ idMe, postId }: { idMe: string; postId: string }) {
        const comments = await CommentModel.find<CommentUserIdToSchema>({
            postId,
            parentId: null,
        })
            .populate<PopulateOption>({
                path: 'user',
                model: 'user',
                select: selectUserBase,
            })
            // Chuyển đổi dữ liệu sang kết quả
            .transform(async (doc) => {
                const comments: ResponseComment[] = []
                for (const comment of doc) {
                    const countChildren = await CommentModel.find({
                        parentId: comment._id,
                    })
                        .countDocuments()
                        .exec()
                    const isLike = await this.checkLikeComment({
                        userId: idMe,
                        commentId: comment._id,
                    })
                    const countLike = await this.countLike({
                        id: comment._id,
                        type: 'comment',
                    })
                    comments.push({
                        ...comment._doc,
                        countChildren,
                        countLike: countLike,
                        isLike,
                        replies: [],
                    })
                }
                return comments
            })
            .sort({ createdAt: 'desc' })
            .exec()
        return comments
    }
    async likeComment({ idComment, idMe }: { idComment: string; idMe: string }) {
        const comment = await CommentModel.findOne({
            _id: idComment,
        })
        if (!comment) throw new NotFoundError({ message: 'Comment not found' })
        await LikeModel.create({
            commentId: idComment,
            user: idMe,
        })
        return comment._id
    }
    async dislikeComment({ idComment, idMe }: { idComment: string; idMe: string }) {
        const comment = await CommentModel.findOne({
            _id: idComment,
        })
        if (!comment) throw new NotFoundError({ message: 'Comment not found' })
        await LikeModel.deleteOne({
            commentId: idComment,
            user: idMe,
        })
        return comment._id
    }
    async checkLikeComment({ userId, commentId }: { userId: string; commentId: string }) {
        const isLike = await LikeModel.findOne({
            commentId,
            user: userId,
        })
        return Boolean(isLike)
    }
    async commentChildren({ parentId, idMe }: { parentId: string; idMe: string }) {
        const comments = await CommentModel.find<CommentUserIdToSchema>({
            parentId,
        })
            .populate<PopulateOption>({
                path: 'user',
                model: 'user',
                select: { fullName: true, userName: true, avatar: true, verify: true },
            })
            .transform(async (doc) => {
                const comments: ResponseComment[] = []
                for (const comment of doc) {
                    const countLike = await this.countLike({
                        id: comment._id,
                        type: 'comment',
                    })
                    const likes = await LikeModel.find({
                        commentId: comment._id,
                    })
                    const isLike = likes.some((like) => like.user.toString() === idMe)
                    const user = convertUserIdToUser(comment._doc)
                    comments.push({
                        ...user,
                        countChildren: 0,
                        countLike,
                        isLike,
                        replies: [],
                    })
                }
                return comments
            })
        return comments
    }
    async upload(posts: Omit<Post, '_id' | '_doc' | 'author'>, idMe: string) {
        const post = await PostModel.create({ ...posts, author: idMe })
        return post._id
    }
    async suggests(idMe: string, modifile: { limit: number; page: number }) {
        const posts = await PostModel.find()
            .ne('author', idMe)
            .populate('author', selectUserBase)
            .sort({ createdAt: 'desc' })
            .transform(async (doc) => {
                const posts = []
                for (const post of doc) {
                    const postId = post._id.toString()
                    const commentTotal = await this.countComment(postId)
                    const likeTotal = await this.countLike({
                        id: postId,
                        type: 'post',
                    })
                    const isLike = await this.checkLike(idMe, postId)
                    posts.push({
                        ...post.toObject(),
                        likeTotal,
                        commentTotal: commentTotal,
                        isLike,
                        comments: [],
                        likes: [],
                    })
                }
                return posts.slice(
                    (modifile.page - 1) * modifile.limit,
                    modifile.page * modifile.limit,
                ) as ResponsePost[]
            })
        return posts
    }
    async checkLike(userId: string, postId: string) {
        const posts = await LikeModel.findOne({
            postId,
            user: userId,
        })
        return posts ? true : false
    }
    async deletePosts(postId: string, idMe: string) {
        const result = await PostModel.deleteOne({
            _id: postId,
            author: idMe,
        })
            .orFail(new NotFoundError({ message: 'Post not found' }))
            .exec()
        return result.deletedCount
    }
    async editPosts(post: Post, idMe: string) {
        await PostModel.updateOne({ _id: post._id, author: idMe }, post).orFail(
            new NotFoundError({ message: 'Post not found' }),
        )
        const result = await this.getPost(post._id.toString(), idMe)
        return result
    }
    async usersLikePost(postId: string) {
        // Lấy bài đăng
        const posts = await PostModel.findOne({ _id: postId })
            .select({ _id: true })
            .exec()
        // Xử lý lỗi nếu post = null
        if (!posts)
            throw new BadRequestError({
                message: 'Post not found',
            })
        const likes = await LikeModel.find({
            postId,
        })
            .populate({
                path: 'user',
                model: 'user',
                select: selectUserBase,
            })
            .transform((doc) => doc.map((doc) => doc.user))
            .sort({ createdAt: 'desc' })
            .exec()
        // Xử lý người likes bài đăng
        // Trả về kết quả
        return {
            users: likes,
            count: likes.length,
        }
    }
    async countPost(userId: string) {
        /** `countPost(userId: string)` return number */
        return await PostModel.countDocuments({
            isDelete: false,
            author: userId,
        }).exec()
    }
    async countComment(postId: string) {
        /**
         * countComment(postId: string)
         * return number
         */
        return await CommentModel.countDocuments({
            postId,
        }).exec()
    }
    async countLike({ id, type }: { id: string; type: 'post' | 'comment' }) {
        if (type === 'post') {
            return await LikeModel.countDocuments({
                postId: id,
            }).exec()
        } else {
            return await LikeModel.countDocuments({
                commentId: id,
            }).exec()
        }
    }
}
const postsProvider = new PostsService()
export default postsProvider
