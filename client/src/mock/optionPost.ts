import AboutAccount from '~/components/AboutAccount'
import Alert from '~/components/Alert'
import EditPosts from '~/components/EditPosts'
import Unfollow from '~/components/Unfollow'
import { OptionCommon } from '~/types/options'

export type HandleName =
    | 'edit'
    | 'share'
    | 'copy'
    | 'cancel'
    | 'go-post'
    | 'delete'
    | 'hidden-count-like'
    | 'report'
    | 'unfollow'
    | 'about-accout'
    | string

export interface InterOptionPost extends OptionCommon<HandleName, InterOptionPost> {}

export const optionReport: InterOptionPost[] = [
    {
        id: 1,
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
        title: "It's spam",
        isStopPropagation: false,
        type: 'normal',
        handleName: 'report',
    },
    {
        id: 2,
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
        title: 'Nudity or sexual activity',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'report',
    },
    {
        id: 3,
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
        title: 'Hate speech or symbols',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'report',
    },
    {
        id: 4,
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
        title: 'Violence or dangerous organizations',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'report',
    },
    {
        id: 5,
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
        title: 'Sale of illegal or regulated goods',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'report',
    },
    {
        id: 6,
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
        title: 'Bullying or harassment',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'report',
    },
    {
        id: 7,
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
        title: 'Intellectual property violation',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'report',
    },
    {
        id: 8,
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
        title: 'Suicide or self-injury',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'report',
    },
    {
        id: 9,
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
        title: 'Eating disorders',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'report',
    },
    {
        id: 10,
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
        title: 'Scam or fraud',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'report',
    },
    {
        id: 11,
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
        title: 'Drugs',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'report',
    },
    {
        id: 12,
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
        title: 'False information',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'report',
    },
    {
        id: 13,
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
        title: "I just don't like it",
        isStopPropagation: false,
        type: 'normal',
        handleName: 'report',
    },
]
export const optionShare: InterOptionPost[] = [
    {
        id: 1,
        icon: {
            name: 'hugeicons:threads',
            place: 'left',
        },
        title: 'Share to Threads',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'share',
    },
    {
        id: 2,
        icon: {
            name: 'circum:facebook',
            place: 'left',
        },
        title: 'Share to Facebook',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'share',
    },
    {
        id: 3,
        icon: {
            name: 'basil:facebook-messenger-outline',
            place: 'left',
        },
        title: 'Share to Messenger',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'share',
    },
    {
        id: 4,
        icon: {
            name: 'hugeicons:twitter',
            place: 'left',
        },
        title: 'Share to Twitter',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'share',
    },
    {
        id: 5,
        icon: {
            name: 'fluent:mail-48-regular',
            place: 'left',
        },
        title: 'Share via Email',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'share',
    },
    {
        id: 6,
        icon: {
            name: 'material-symbols-light:qr-code-scanner-rounded',
            place: 'left',
        },
        title: 'QR code',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'share',
    },
    {
        id: 7,
        icon: {
            name: 'ant-design:link-outlined',
            place: 'left',
        },
        title: 'Copy link',
        isStopPropagation: false,
        type: 'normal',
        handleName: 'copy',
    },
]
export const optionPost: InterOptionPost[] = [
    {
        id: 1,
        type: 'me',
        title: 'Delete',
        handleName: 'delete',
        isStopPropagation: true,
        classname: 'text-red-500 !font-bold',
        element: Alert,
    },
    {
        id: 2,
        type: 'me',
        title: 'Edit',
        handleName: 'edit',
        isStopPropagation: true,
        element: EditPosts,
    },
    // {
    //     id: 3,
    //     type: 'me',
    //     title: 'Hidden like count to others',
    //     handleName: 'hidden-count-like',
    //     isStopPropagation: false,
    // },
    {
        id: 4,
        type: 'me',
        title: 'Turn off commenting',
        handleName: 'comment-disabled',
        isStopPropagation: false,
    },
    {
        id: 5,
        type: 'other',
        title: 'Report',
        handleName: 'report',
        isStopPropagation: true,
        classname: 'text-red-500 !font-bold',
        children: {
            title: 'Report post',
            subtitle: 'Why are you reporting this post?',
            data: optionReport,
        },
    },
    {
        id: 6,
        type: 'other',
        title: 'Unfollow',
        handleName: 'unfollow',
        isStopPropagation: true,
        classname: 'text-red-500 !font-bold',
        element: Unfollow,
    },
    {
        id: 7,
        type: 'normal',
        title: 'Share post',
        handleName: 'share',
        isStopPropagation: true,
        children: {
            title: 'Share post',
            data: optionShare,
        },
    },
    {
        id: 8,
        type: 'hidden',
        title: 'Go post',
        handleName: 'go-post',
        isStopPropagation: false,
        to: '/p/',
    },
    {
        id: 9,
        type: 'normal',
        title: 'Copy link',
        handleName: 'copy',
        isStopPropagation: false,
    },
    {
        id: 10,
        type: 'other',
        title: 'About this account',
        handleName: 'about-accout',
        isStopPropagation: true,
        element: AboutAccount,
    },
    {
        id: 11,
        type: 'normal',
        title: 'Cancel',
        handleName: 'cancel',
        isStopPropagation: false,
    },
]

export const initOptionPost = ({
    commentDisabled, // countLikeDisable,
}: {
    // countLikeDisable?: boolean
    commentDisabled?: boolean
}) =>
    optionPost.map((item) => {
        // if (item.handleName === 'hidden-count-like' && countLikeDisable) {
        //     return {
        //         ...item,
        //         title: 'Unhide like count to others',
        //     }
        // }
        if (item.handleName === 'comment-disabled' && commentDisabled) {
            return {
                ...item,
                title: 'Turn on commenting',
            }
        }
        return item
    })
