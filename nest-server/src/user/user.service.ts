import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from './schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IdsDto } from './dto/ids.dto'
import { UserUpdateDto } from './dto/user-update.dto'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { ResUser } from 'src/auth/interface'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwt: JwtService,
        private configService: ConfigService,
    ) {}
    async search(q: string, userName: string) {
        const searchRegex = new RegExp(q, 'i')
        return this.userModel
            .find(
                { userName: { $ne: userName, $regex: searchRegex } },
                { password: false },
            )
            .populate('posts')
    }
    async user(username: string) {
        const user = await this.userModel
            .findOne({ userName: username }, { password: false })
            .populate('posts')
            .exec()
        if (!user)
            throw new HttpException({ msg: 'Not found user !' }, HttpStatus.NOT_FOUND)
        return user
    }
    async suggest(userName: string, limit: number = 6) {
        const user = await this.userModel.findOne({ userName }, { password: false })
        const users = await this.userModel
            .find({
                verify: true,
                userName: { $ne: userName },
                _id: { $nin: user.following },
            })
            .limit(limit)
            .populate('posts')
        return users
    }
    async userCurrent(id: string, userName: string) {
        const user = await this.userModel
            .findOne<ResUser>({ _id: id, userName }, { password: false })
            .populate('posts')
        if (!user)
            throw new HttpException({ msg: 'Not found user !' }, HttpStatus.NOT_FOUND)
        const accessToken = this.jwt.sign(
            { userName: user.userName },
            {
                secret: this.configService.get('KEY_JWT'),
                expiresIn: '120s',
            },
        )
        return { ...user._doc, accessToken }
    }
    async userUpdate(userName: string, data: UserUpdateDto) {
        await this.userModel.updateOne({ userName }, data)
        return { msg: 'Update success' }
    }
    async follow(ids: IdsDto, userName: string) {
        const isFollow = await this.userModel.findById(ids.idFollow)
        const isFollower = await this.userModel.findOne({ userName })
        if (!isFollow || !isFollower)
            throw new HttpException({ msg: 'Unauthorized' }, HttpStatus.UNAUTHORIZED)
        await this.userModel.updateOne(
            { _id: ids.idFollow, followers: { $nin: [isFollower._id] } },
            { $push: { followers: isFollower._id } },
        )
        await this.userModel.updateOne(
            { _id: isFollower._id, following: { $nin: [ids.idFollow] } },
            { $push: { following: ids.idFollow } },
        )
        return { msg: 'Follow success !' }
    }
    async unfollow(ids: IdsDto, userName: string) {
        const isFollow = await this.userModel.findById(ids.idFollow)
        const isFollower = await this.userModel.findOne({ userName })
        if (!isFollow || !isFollower)
            throw new HttpException({ msg: 'Unauthorized' }, HttpStatus.UNAUTHORIZED)
        await this.userModel.updateOne(
            { _id: ids.idFollow, followers: { $in: [isFollower._id] } },
            { $pull: { followers: isFollower._id } },
        )
        await this.userModel.updateOne(
            { _id: isFollower._id, following: { $in: [ids.idFollow] } },
            { $pull: { following: ids.idFollow } },
        )
        return { msg: 'Unfollow success !' }
    }
    async info(userName: string, usernameF: string) {
        const user = await this.userModel.findOne<ResUser>(
            { userName: usernameF },
            { password: false },
        )
        const isFollowing = Boolean(
            await this.userModel.findOne({
                userName,
                following: { $in: user._id },
            }),
        )
        const isFollower = Boolean(
            await this.userModel.findOne({
                userName,
                followers: { $in: user._id },
            }),
        )
        return {
            ...user._doc,
            isFollower,
            isFollowing,
        }
    }
}
