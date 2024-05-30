import { OptionCommon } from '~/types/options'
import { optionShare } from './optionPost'
import AboutAccount from '~/components/AboutAccount'
import Alert from '~/components/Alert'

export type HandleName =
    | 'settings'
    | 'share-account'
    | 'copy'
    | 'remove-follower'
    | 'logout'
    | 'report'
    | 'about-accout'
    | 'cancel'
    | 'block'
    | 'unblock'
    | string

export type InterOptionProfile = OptionCommon<HandleName, InterOptionProfile>

const optionReport: InterOptionProfile[] = [
    {
        id: 1,
        title: 'Report Post, Message or Comment',
        isStopPropagation: true,
        type: 'other',
        handleName: 'report',
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
    },
    {
        id: 2,
        title: 'Report Account',
        isStopPropagation: true,
        type: 'other',
        handleName: 'report',
        icon: {
            name: 'uiw:right',
            place: 'right',
        },
    },
]

export const optionProfile: InterOptionProfile[] = [
    {
        id: 1,
        title: 'Settings',
        handleName: 'settings',
        type: 'me',
        isStopPropagation: false,
        to: '/accounts/edit',
    },

    {
        id: 6,
        type: 'other',
        title: 'Block',
        handleName: 'block',
        isStopPropagation: true,
        classname: 'text-red-500 !font-bold',
        element: Alert,
    },
    {
        id: 5,
        type: 'other',
        title: 'Report',
        handleName: 'report',
        isStopPropagation: true,
        classname: 'text-red-500 !font-bold',
        children: {
            title: 'Report',
            subtitle: 'Why are you reporting this account?',
            data: optionReport,
        },
    },
    {
        id: 2,
        isStopPropagation: true,
        title: 'Remove follower',
        handleName: 'remove-follower',
        type: 'hidden',
    },
    {
        id: 7,
        type: 'normal',
        title: 'Share to',
        handleName: 'share-account',
        isStopPropagation: true,
        children: {
            title: 'Share to',
            data: optionShare as InterOptionProfile[],
        },
    },
    {
        id: 3,
        isStopPropagation: true,
        title: 'Log out',
        handleName: 'logout',
        type: 'me',
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
        id: 4,
        isStopPropagation: false,
        title: 'Cancel',
        handleName: 'cancel',
        type: 'normal',
    },
]

export const initOptionProfile = ({ isBlock }: { isBlock?: boolean }) =>
    optionProfile.map((item) => {
        if (item.handleName === 'block' && isBlock) {
            return {
                ...item,
                title: 'Unblock',
                handleName: 'unblock',
                isStopPropagation: false,
            }
        }
        return item
    })
