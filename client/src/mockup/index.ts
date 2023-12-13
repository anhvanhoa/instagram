import { User } from '~/types/auth'
export const users: User[] = [
    {
        _id: '1',
        gender: 'nam',
        userName: 'john_doe',
        fullName: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://source.unsplash.com/random',
        numberPhone: '123456789',
        birthday: '1990-01-01',
        bio: 'A software developer',
        posts: [],
        followers: [],
        following: [],
        stories: [],
        verify: true,
        notifications: [],
        accessToken: 'access_token_1',
    },

    {
        _id: '2',
        gender: 'nữ',
        userName: 'jane_doe',
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://source.unsplash.com/random',
        numberPhone: '987654321',
        birthday: '1995-02-15',
        bio: 'An artist',
        posts: [],
        followers: [],
        following: [],
        stories: [],
        verify: false,
        notifications: [],
        accessToken: 'access_token_2',
    },
]
