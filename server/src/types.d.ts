export type Gender = 'nam' | 'nữ' | 'khác';
export interface User {
    _id: string;
    fbId: string;
    gender: Gender;
    userName: string;
    fullName: string;
    email: string;
    avatar: string;
    numberPhone: string;
    birthday: string;
    password: string;
    bio: string;
    posts: Array;
    followers: Array;
    following: Array;
    stories: Array;
    verify: boolean;
    notifications: Array;
}

export interface ResUser extends Omit<User, 'password'> {
    accessToken: string;
}

export interface Code {
    _id: string;
    email?: string;
    numberPhone?: string;
    otp: string;
}

export interface Info {
    email?: string;
    numberPhone: ?string;
    userName?: string;
}
