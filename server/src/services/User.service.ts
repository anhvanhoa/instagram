import { PopulateOption } from 'mongoose'
import UserModel from '~/models/User.model'
import { User } from '~/types/user'
import { BadRequestError } from '~/utils/Errors'

export class UserService {
    async search(q: string, userName: string) {
        // const searchRegex = new RegExp(q, 'i')
        const users = await UserModel.find(
            // { userName: { $ne: userName, $regex: searchRegex } },
            {
                $text: {
                    $search: q,
                },
                userName: { $ne: userName },
            },
            { password: false, email: false, numberPhone: false },
        ).populate('posts')
        return users
    }
    //
    async userUpdate(userName: string, data: User) {
        return await UserModel.updateOne({ userName }, data)
    }
    //
    async profile(id: string) {
        const user = await UserModel.findOne({ _id: id }, { password: false }).populate(
            'posts',
        )
        if (!user) throw new BadRequestError({ message: 'User not found' })
        return user
    }
    //
    async user(userName: string) {
        const user = await UserModel.findOne(
            { userName },
            { password: false },
        ).populate<PopulateOption>({
            path: 'posts',
            options: {
                sort: { createdAt: 'desc' },
            },
        })
        if (!user) throw new BadRequestError({ message: 'User not found' })
        return user
    }
    //
    async follow(idFollow: string, userName: string) {
        if (!idFollow || !userName)
            throw new BadRequestError({ message: 'Data is not valid' })
        const isFollow = await UserModel.findById(idFollow)
        const isFollower = await UserModel.findOne({ userName })
        if (!isFollow || !isFollower)
            throw new BadRequestError({ message: 'Unauthorized' })
        await UserModel.updateOne(
            { _id: idFollow, followers: { $nin: [isFollower._id] } },
            { $push: { followers: isFollower._id } },
        )
        return await UserModel.updateOne(
            { _id: isFollower._id, following: { $nin: [idFollow] } },
            { $push: { following: idFollow } },
        )
    }
    //
    async unfollow(idFollow: string, userName: string) {
        if (!idFollow || !userName)
            throw new BadRequestError({ message: 'Data is not valid' })
        const isFollow = await UserModel.findById(idFollow)
        const isFollower = await UserModel.findOne({ userName })
        if (!isFollow || !isFollower)
            throw new BadRequestError({ message: 'Unauthorized' })
        await UserModel.updateOne(
            { _id: idFollow, followers: { $in: [isFollower._id] } },
            { $pull: { followers: isFollower._id } },
        )

        return await UserModel.updateOne(
            { _id: isFollower._id, following: { $in: [idFollow] } },
            { $pull: { following: idFollow } },
        )
    }
    //
    async info(userName: string, usernameF: string) {
        const user = await UserModel.findOne({
            userName: usernameF,
        }).select({ password: false })
        if (!user) throw new BadRequestError({ message: 'Unauthorized' })
        const isFollowing = Boolean(
            await UserModel.findOne({
                userName,
                following: { $in: user?._id },
            }),
        )
        const isFollower = Boolean(
            await UserModel.findOne({
                userName,
                followers: { $in: user?._id },
            }),
        )
        return { ...user._doc, isFollower, isFollowing }
    }
    //
    async suggest(userName: string, limit: number = 6) {
        if (!userName) throw new BadRequestError({ message: 'Unauthorized' })
        const user = await UserModel.findOne({ userName })
        const users = await UserModel.find({
            verify: true,
            userName: { $ne: userName },
            _id: { $nin: user?.following },
        })
            .limit(limit)
            .populate('posts')
        return users
    }
}
const userProvider = new UserService()
export default userProvider
