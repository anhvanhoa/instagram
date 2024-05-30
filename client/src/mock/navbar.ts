import { NavbarItem } from '~/types/navbar'

export const navbarDesk: NavbarItem[] = [
    {
        id: 1,
        icon: 'home-thin',
        iconActive: 'home-solid',
        link: '/',
        name: 'Home',
        // class: ''
    },
    {
        id: 2,
        icon: 'search-thin',
        iconActive: 'search-solid',
        link: '/#',
        name: 'Search',
        // class: 'is-cllapse is-side'
    },
    {
        id: 3,
        icon: 'explore-thin',
        iconActive: 'explore-solid',
        link: '/explore',
        name: 'Explore',
    },
    // {
    //     id: 4,
    //     icon: 'reels-thin',
    //     iconActive: 'reels-solid',
    //     link: '/reels',
    //     name: 'Reels',
    // },
    {
        id: 5,
        icon: 'meaagae-thin',
        iconActive: 'message-solid',
        link: '/message',
        name: 'Message',
        // class: 'is-cllapse'
    },
    {
        id: 6,
        icon: 'heart-thin',
        iconActive: 'heart-solid',
        link: '/#',
        name: 'Notification',
        // class: 'is-cllapse'
    },
    {
        id: 7,
        icon: 'create-post-thin',
        iconActive: 'create-post-solid',
        link: '/#',
        name: 'Create',
    },
]
