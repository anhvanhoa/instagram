import { HttpStatus } from '~/http-status.enum'
import PostsModel from '~/models/Posts.model'
import UserModel from '~/models/User.model'
import { Posts } from '~/types'
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
        const posts = await PostsModel.find({ author: { $in: userFollowing } })
        return httpResponse(HttpStatus.OK, posts)
    }
    async upload(posts: Omit<Posts, '_id' | '_doc' | 'author'>, userName: string) {
        const author = await UserModel.findOne({ userName })
        if (!author) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        await PostsModel.create({ ...posts, author: author._id })
        return httpResponse(HttpStatus.OK, { msg: 'create posts success !' })
    }
}
const postsProvider = new PostsService()
export default postsProvider
