import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
}
