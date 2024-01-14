import Img from './Img'
import { Icon } from '@iconify/react/dist/iconify.js'
import socket from '~/socketIo'
import { SeenChat, UserChat } from '~/types/chat'

interface Props {
    user: UserChat
}
const AccountChat = ({ user }: Props) => {
    const seen =
        ({ idContentChat, idUser }: SeenChat) =>
        () =>
            socket.emit('seen', { idUser, idContentChat })
    return (
        <div
            className='mt-3 cursor-pointer flex items-center justify-center lg:justify-between lg:px-6 py-2'
            onClick={seen({
                idUser: user._id,
                idContentChat: user.chat._id,
            })}
        >
            <div className='flex items-center w-full'>
                <div className='lg:w-14 lg:h-14 h-10 w-10 mx-auto lg:mx-0 overflow-hidden rounded-[50%] flex-shrink-0'>
                    <Img className='w-full h-full object-cover' src={user.avatar} alt='' />
                </div>
                <div className='hidden ml-3 lg:flex flex-col gap-y-1 overflow-hidden'>
                    <p className='text-sm'>{user.userName}</p>
                    <p className='text-xs text-[#737373] whitespace-nowrap text-ellipsis overflow-hidden'>
                        <span className='font-medium text-black'>{user.chat.idUser !== user._id ? 'You:' : ''}</span>
                        <span className='px-px'></span>
                        {user.chat.message}
                    </p>
                </div>
            </div>
            {!user.chat.isSeen && user.chat.idUser === user._id && (
                <Icon className='text-3xl text-primary' icon='radix-icons:dot-filled' />
            )}
        </div>
    )
}

export default AccountChat
