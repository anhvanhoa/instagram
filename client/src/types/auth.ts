export interface UserBasic {
    _id: string;
    fbId?: string;
    fullName: string;
    userName: string;
    email: string;
    numberPhone: string;
    avatar: string;
    accessToken: string;
}
export interface User extends Omit<UserBasic, 'accessToken'> {
    gender: string;
    bio: string;
    posts: number;
    listPosts: [];
    follower: number;
    listFollower: [];
    following: number;
    listFollowing: [];
    birthday: string;
    verify: boolean;
}

export interface Auth {
    user: UserBasic;
    isLoading: boolean;
    error: boolean;
}

export type Signup = {
    emailOrPhone: string;
    fullName: string;
    userName: string;
    password: string;
    birthday: string;
    codeVerify: string;
};

export interface authSignup {
    currentUser: Signup | null;
    isLoading: boolean;
    error: boolean;
}

export interface ResData {
    data: User | null;
    status: number;
    isError: boolean;
    message: string;
}

export interface AuthLogin {
    emailOrPhone: string;
    password: string;
}
export const initialUser: User = {
    _id: '',
    bio: '',
    birthday: '',
    email: '',
    follower: 0,
    following: 0,
    fullName: '',
    gender: '',
    listFollower: [],
    listFollowing: [],
    listPosts: [],
    numberPhone: '',
    posts: 0,
    userName: '',
    avatar: '',
    fbId: '',
    verify: false,
};
