import Img from './Img'
import { Icon } from '@iconify/react/dist/iconify.js'
import socket from '~/socketIo'
import { SeenChat, UserChat } from '~/types/chat'

interface Props {
    user: UserChat
}
const AccountChat = ({ user }: Props) => {
    const handleSeen = () => {
        if (!user.chat) return
        seen({
            idUser: user._id,
            idContentChat: user.chat._id,
        })
    }
    const seen =
        ({ idContentChat, idUser }: SeenChat) =>
        () =>
            socket.emit('seen', { idUser, idContentChat })
    return (
        <div
            className='cursor-pointer flex items-center justify-center lg:justify-between lg:px-6 py-2 px-2 xs:px-0 hover:bg-gray-100'
            onClick={handleSeen}
        >
            <div className='flex items-center w-full relative'>
                {user.chat && !user.chat.isSeen && user.chat.idUser === user._id && (
                    <Icon
                        className='w-8 h-8 text-primary absolute -top-3 -right-2 lg:hidden xs:block hidden'
                        icon='radix-icons:dot-filled'
                    />
                )}
                <div className=' lg:w-14 lg:h-14 h-12 w-12 mx-auto lg:mx-0 overflow-hidden rounded-[50%] xs:flex-shrink-0'>
                    <Img className='w-full h-full object-cover' src={user.avatar} alt='' />
                </div>
                <div className='xs:hidden ml-3 lg:flex flex-col gap-y-1 overflow-hidden flex-1'>
                    <p className=''>{user.fullName}</p>
                    {user.chat && (
                        <p className='text-xs text-[#737373] whitespace-nowrap text-ellipsis overflow-hidden'>
                            <span className='font-medium text-black'>
                                {user.chat.idUser !== user._id ? 'You:' : ''}
                            </span>
                            <span className='px-px'></span>
                            {user.chat.message}
                        </p>
                    )}
                </div>
            </div>
            {user.chat && !user.chat.isSeen && user.chat.idUser === user._id && (
                <Icon className='text-3xl text-primary block xs:hidden lg:block' icon='radix-icons:dot-filled' />
            )}
        </div>
    )
}

export default AccountChat
