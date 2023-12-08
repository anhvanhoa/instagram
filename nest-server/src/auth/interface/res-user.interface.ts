import { User } from 'src/user/schemas/user.schema';

export interface ResUser extends User {
    _doc: User;
    accessToken: string;
}
