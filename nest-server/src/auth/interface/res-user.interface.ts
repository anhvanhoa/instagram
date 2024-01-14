import { ObjectId } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export interface ResUser extends User {
    _id: ObjectId;
    _doc: User;
    accessToken: string;
}
