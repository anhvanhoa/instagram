import { HttpStatus } from '~/http-status.enum'
import UserModel from '~/models/User.model'
import { httpResponse } from '~/utils/HandleRes'

export class UserService {
    async search(q: string, userName: string) {
        const searchRegex = new RegExp(q, 'i')
        const users = await UserModel.find(
            { userName: { $ne: userName, $regex: searchRegex } },
            { password: false },
        )
        return httpResponse(HttpStatus.OK, users)
    }
    //
    async user(userName: string) {
        const user = await UserModel.findOne({ userName }, { password: false })
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
}
const userProvider = new UserService()
export default userProvider
