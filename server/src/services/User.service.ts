import UserModel, { selectUserBase } from '~/models/User.model'
import { FollowersOrFollowingToSchema, User, UserNoPassword } from '~/types/user'
import cloudinaryProvider from '~/utils/Cloudnary'
import { NotFoundError } from '~/utils/Errors'
import postsProvider from './Post.service'
import UserFollowModel from '~/models/UserFollow.model'
import BlockModel from '~/models/Block.model'

export class UserService {
    async search(q: string, userName: string) {
        const users = await UserModel.find(
            {
                $text: {
                    $search: q,
                },
                userName: { $ne: userName },
            },
            selectUserBase,
        )
        return users
    }
    //
    async userUpdate(
        { idMe, avatar }: { idMe: string; avatar: string },
        data: Partial<User>,
    ) {
        if (typeof data?.avatar === 'string') {
            avatar !== '' && (await cloudinaryProvider.destroy(avatar.split('.')[0]))
            if (data.avatar === '') data.avatar = 'avatar-empty.png'
        }
        await UserModel.updateOne({ _id: idMe }, data)
        return await this.profile(idMe)
    }
    //
    async profile(userId: string) {
        const user = await UserModel.findOne<UserNoPassword>({
            _id: userId,
        })
            .select({ password: false })
            .exec()
        if (!user) throw new NotFoundError({ message: 'User not found' })
        // Lấy ra tất cả người mà người ta follow
        const { totalFollowers } = await this.countFollowers(user._id)
        // Lấy ra tất cả người follow của người ta
        const { totalFollowing } = await this.countFollowing(user._id)
        const totalPost = await postsProvider.countPost(user._id)
        return {
            ...user._doc,
            totalFollowers,
            totalFollowing,
            totalPost,
        }
    }
    //
    async user({ idMe, userName }: { idMe: string; userName: string }) {
        const user = await UserModel.findOne<UserNoPassword>({
            userName,
        })
            .select({ password: false })
            .exec()
        if (!user) throw new NotFoundError({ message: 'User not found' })
        // Lấy ra tất cả người mà người ta follow
        const { totalFollowers, followers } = await this.countFollowers(user._id)
        // Lấy ra tất cả người follow của người ta
        const { totalFollowing, following } = await this.countFollowing(user._id)
        const totalPost = await postsProvider.countPost(user._id)
        // kiểm tra người ta follow mình chưa?
        const isFollowing = followers.some(
            ({ followers }) => followers.toString() === idMe.toString(),
        )
        // kiểm tra mình follow người ta chưa?
        const isFollower = following.some(
            ({ user }) => user.toString() === idMe.toString(),
        )
        const isMe = idMe.toString() === user._id.toString()
        const block = await this.checkBlock(user._id.toString(), idMe)
        if (block.isBlock || block.blockByUser) {
            return {
                user: {
                    ...user._doc,
                    totalFollowers: 0,
                    totalFollowing: 0,
                    totalPost: 0,
                    posts: [],
                },
                additional: {
                    isFollowing: false,
                    isFollower: false,
                    isMe: false,
                    isFriend: false,
                    isBlock: block.isBlock,
                    blockByUser: block.blockByUser,
                },
            }
        }
        return {
            user: {
                ...user._doc,
                totalFollowers,
                totalFollowing,
                totalPost,
                posts: [],
            },
            additional: {
                isFollowing,
                isFollower,
                isMe,
                isFriend: isFollowing && isFollower,
                isBlock: block.isBlock,
                blockByUser: block.blockByUser,
            },
        }
    }
    //
    async block(idUserBlock: string, idMe: string) {
        const user = await BlockModel.findOne({ userBlock: idUserBlock, user: idMe })
        if (user) return idUserBlock
        await BlockModel.create({ userBlock: idUserBlock, user: idMe })
        return idUserBlock
    }
    //
    async unblock(idUserBlock: string, idMe: string) {
        const user = await BlockModel.findOne({ userBlock: idUserBlock, user: idMe })
        if (!user) return idUserBlock
        await BlockModel.deleteOne({ userBlock: idUserBlock, user: idMe })
        return idUserBlock
    }
    //
    async checkBlock(idUserBlock: string, idMe: string) {
        const isBlock = await BlockModel.findOne({
            userBlock: idUserBlock,
            user: idMe,
        })
        const blockByUser = await BlockModel.findOne({
            userBlock: idMe,
            user: idUserBlock,
        })
        return {
            isBlock: Boolean(isBlock),
            blockByUser: Boolean(blockByUser),
        }
    }
    //
    async follow(idFollow: string, idMe: string) {
        const user = await UserModel.findById(idFollow)
        if (!user) throw new NotFoundError({ message: 'User not found' })
        await UserFollowModel.create({ user: user._id, followers: idMe })
        return idFollow
    }
    //
    async unfollow(idFollow: string, idMe: string) {
        const user = await UserModel.findById(idFollow)
        if (!user) throw new NotFoundError({ message: 'User not found' })
        await UserFollowModel.deleteOne({ user: user._id, followers: idMe })
        return idFollow
    }
    //
    async suggest(idMe: string, limit: number = 6) {
        const followers = await UserFollowModel.find({
            followers: idMe,
        })
        const users = await UserModel.find({
            _id: { $ne: idMe, $nin: followers.map((item) => item.user) },
        }).limit(limit)
        return users
    }
    async removeFollower({ idMe, userId }: { idMe: string; userId: string }) {
        const user = await UserModel.findOne({ _id: userId })
        if (!user) throw new NotFoundError({ message: 'User not found' })
        await UserFollowModel.deleteOne({ user: idMe, followers: user._id })
        return user._id
    }
    async checkUser(userName: string) {
        const user = await UserModel.findOne({ userName })
        if (!user)
            return {
                isAccount: false,
            }
        return {
            isAccount: true,
        }
    }
    async followers({ userName }: { userName: string }) {
        const user = await UserModel.findOne({ userName })
        if (!user) throw new NotFoundError({ message: 'User not found' })
        const followResult = await UserFollowModel.find<FollowersOrFollowingToSchema>({
            user: user._id,
        })
            .populate('followers', selectUserBase)
            .transform((doc) => doc.map((doc) => doc.followers).slice(0, 12))
            .sort({ createdAt: 'desc' })
        return {
            users: followResult,
            count: followResult.length,
        }
    }
    async showManyFollowersOrFollowing({ idMe, ids }: { idMe: string; ids: string[] }) {
        const followers: { [key: string]: { isFollowing: boolean } } = {}
        for (const id of ids) {
            const isFollowing = await UserFollowModel.findOne({
                user: id,
                followers: idMe,
            })
                .transform((doc) => Boolean(doc))
                .exec()
            followers[id] = { isFollowing }
        }
        return followers
    }
    async following({ userName }: { userName: string }) {
        const user = await UserModel.findOne({ userName })
        if (!user) throw new NotFoundError({ message: 'User not found' })
        const followResult = await UserFollowModel.find<FollowersOrFollowingToSchema>({
            followers: user._id,
        })
            .populate('user', selectUserBase)
            .transform((doc) => doc.map((doc) => doc.user).slice(0, 12))
            .sort({ createdAt: 'desc' })
        return {
            users: followResult,
            count: followResult.length,
        }
    }
    async countFollowers(userId: string) {
        // Lấy vả đếm tất cả người mà follow mình
        // mình => user
        // người ta => followers
        const followers = await UserFollowModel.find({
            user: userId,
        }).exec()
        return {
            totalFollowers: followers.length,
            followers,
        }
    }
    async countFollowing(userId: string) {
        // Lấy vả đếm tất cả người mà mình follow
        // mình => followers
        // người ta => user
        const following = await UserFollowModel.find({
            followers: userId,
        }).exec()
        return {
            totalFollowing: following.length,
            following,
        }
    }
}
const userProvider = new UserService()
export default userProvider
