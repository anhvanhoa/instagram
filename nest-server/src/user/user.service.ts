import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdsDto } from './dto/ids.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    async search(q: string, userName: string) {
        const searchRegex = new RegExp(q, 'i');
        return this.userModel.find(
            { userName: { $ne: userName, $regex: searchRegex } },
            { password: false },
        );
    }
    async user(username: string) {
        const user = await this.userModel.findOne(
            { userName: username },
            { password: false },
        );
        if (!user)
            throw new HttpException(
                { msg: 'Not found user !' },
                HttpStatus.NOT_FOUND,
            );
        return user;
    }

    async follow(ids: IdsDto, userName: string) {
        const isFollow = await this.userModel.findById(ids.idFollow);
        const isFollower = await this.userModel.findOne({ userName });
        if (!isFollow || !isFollower)
            throw new HttpException(
                { msg: 'Unauthorized' },
                HttpStatus.UNAUTHORIZED,
            );
        await this.userModel.updateOne(
            { _id: ids.idFollow, followers: { $nin: [isFollower._id] } },
            { $push: { followers: isFollower._id } },
        );
        await this.userModel.updateOne(
            { _id: isFollower._id, following: { $nin: [ids.idFollow] } },
            { $push: { following: ids.idFollow } },
        );
        return { msg: 'Follow success !' };
    }
    async unfollow(ids: IdsDto, userName: string) {
        const isFollow = await this.userModel.findById(ids.idFollow);
        const isFollower = await this.userModel.findOne({ userName });
        if (!isFollow || !isFollower)
            throw new HttpException(
                { msg: 'Unauthorized' },
                HttpStatus.UNAUTHORIZED,
            );
        await this.userModel.updateOne(
            { _id: ids.idFollow, followers: { $in: [isFollower._id] } },
            { $pull: { followers: isFollower._id } },
        );
        await this.userModel.updateOne(
            { _id: isFollower._id, following: { $in: [ids.idFollow] } },
            { $pull: { following: ids.idFollow } },
        );
        return { msg: 'Unfollow success !' };
    }
}
