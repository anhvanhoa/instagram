import { PopulateOption } from 'mongoose'
import { HttpStatus } from '~/http-status.enum'
import UserModel from '~/models/User.model'
import { User } from '~/types'
import { httpResponse } from '~/utils/HandleRes'
import Token from '~/utils/Token'

export class UserService {
    async search(q: string, userName: string) {
        const searchRegex = new RegExp(q, 'i')
        const users = await UserModel.find(
            { userName: { $ne: userName, $regex: searchRegex } },
            { password: false },
        ).populate('posts')
        return httpResponse(HttpStatus.OK, users)
    }
    //
    async userUpdate(userName: string, data: User) {
        await UserModel.updateOne({ userName }, data)
        return httpResponse(HttpStatus.OK, { msg: 'Update success' })
    }
    //
    async userCurrent(id: string, userName: string) {
        const user = await UserModel.findOne(
            { _id: id, userName },
            { password: false },
        ).populate('posts')
        if (!user) return httpResponse(HttpStatus.NOT_FOUND, { msg: 'User not found' })
        const accessToken = Token.createToken({ userName }, '120s')
        return httpResponse(HttpStatus.OK, { ...user._doc, accessToken })
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
        if (!user) return httpResponse(HttpStatus.NOT_FOUND, { msg: 'User not found' })
        return httpResponse(HttpStatus.OK, user)
    }
    //
    async follow(idFollow: string, userName: string) {
        if (!idFollow || !userName)
            throw httpResponse(HttpStatus.BAD_REQUEST, { msg: 'Data is not valid' })
        const isFollow = await UserModel.findById(idFollow)
        const isFollower = await UserModel.findOne({ userName })
        if (!isFollow || !isFollower)
            throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        await UserModel.updateOne(
            { _id: idFollow, followers: { $nin: [isFollower._id] } },
            { $push: { followers: isFollower._id } },
        )
        await UserModel.updateOne(
            { _id: isFollower._id, following: { $nin: [idFollow] } },
            { $push: { following: idFollow } },
        )
        return httpResponse(HttpStatus.OK, { msg: 'Follow success !' })
    }
    //
    async unfollow(idFollow: string, userName: string) {
        if (!idFollow || !userName)
            throw httpResponse(HttpStatus.BAD_REQUEST, { msg: 'Data is not valid' })
        const isFollow = await UserModel.findById(idFollow)
        const isFollower = await UserModel.findOne({ userName })
        if (!isFollow || !isFollower)
            throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        await UserModel.updateOne(
            { _id: idFollow, followers: { $in: [isFollower._id] } },
            { $pull: { followers: isFollower._id } },
        )
        await UserModel.updateOne(
            { _id: isFollower._id, following: { $in: [idFollow] } },
            { $pull: { following: idFollow } },
        )
        return httpResponse(HttpStatus.OK, { msg: 'Unfollow success !' })
    }
    //
    async info(userName: string, usernameF: string) {
        const user = await UserModel.findOne({
            userName: usernameF,
        }).select({ password: false })
        if (!user) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
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
        return httpResponse(HttpStatus.OK, { ...user._doc, isFollower, isFollowing })
    }
    //
    async suggest(userName: string, limit: number = 6) {
        if (!userName)
            throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        const user = await UserModel.findOne({ userName })
        const users = await UserModel.find({
            verify: true,
            userName: { $ne: userName },
            _id: { $nin: user?.following },
        })
            .limit(limit)
            .populate('posts')
        return httpResponse(HttpStatus.OK, users)
    }
}
const userProvider = new UserService()
export default userProvider
