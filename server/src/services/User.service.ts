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
    async follow(ids: { idFollow: string; idFollower: string }) {
        if (!ids.idFollow || !ids.idFollower)
            throw httpResponse(HttpStatus.BAD_REQUEST, { msg: 'Data is not valid' })
        const isFollow = await UserModel.findById(ids.idFollow)
        const isFollower = await UserModel.findById(ids.idFollower)
        if (!isFollow || !isFollower)
            throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        await UserModel.updateOne(
            { _id: ids.idFollow, followers: { $nin: [ids.idFollower] } },
            { $push: { followers: ids.idFollower } },
        )
        await UserModel.updateOne(
            { _id: ids.idFollower, following: { $nin: [ids.idFollow] } },
            { $push: { following: ids.idFollow } },
        )
        return httpResponse(HttpStatus.OK, { msg: 'Follow success !' })
    }
    //
    async unfollow(ids: { idFollow: string; idFollower: string }) {
        if (!ids.idFollow || !ids.idFollower)
            throw httpResponse(HttpStatus.BAD_REQUEST, { msg: 'Data is not valid' })
        const isFollow = await UserModel.findById(ids.idFollow)
        const isFollower = await UserModel.findById(ids.idFollower)
        if (!isFollow || !isFollower)
            throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        await UserModel.updateOne(
            { _id: ids.idFollow, followers: { $in: [ids.idFollower] } },
            { $pull: { followers: ids.idFollower } },
        )
        await UserModel.updateOne(
            { _id: ids.idFollower, following: { $in: [ids.idFollow] } },
            { $pull: { following: ids.idFollow } },
        )
        return httpResponse(HttpStatus.OK, { msg: 'Unfollow success !' })
    }
}
const userProvider = new UserService()
export default userProvider
