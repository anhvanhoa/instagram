import Img from './Img'
import { Icon } from '@iconify/react/dist/iconify.js'
import classNames from 'classnames'
import socket from '~/socketIo'
import { SeenChat, UserChat } from '~/types/chat'

interface Props {
    user: UserChat
}
const AccountChat = ({ user }: Props) => {
    const seen = ({ idContentChat }: SeenChat) => {
        socket.emit('seen', idContentChat)
    }
    const handleSeen = () => {
        if (!user.message) return
        seen({
            idUser: user._id,
            idContentChat: user.message._id,
        })
    }
    return (
        <div
            title={user.fullName}
            className={classNames(
                'cursor-pointer flex items-center justify-center lg:px-3',
                'lg:justify-between py-2 px-2 xs:px-0 hover:dark:bg-sky-50/5 hover:bg-sky-50',
            )}
            onClick={handleSeen}
        >
            <div className='flex items-center w-full relative'>
                {user.message &&
                    !user.message.isSeen &&
                    user.message.idUser === user._id && (
                        <Icon
                            className='w-8 h-8 text-primary absolute -top-3 -right-2 lg:hidden xs:block hidden'
                            icon='radix-icons:dot-filled'
                        />
                    )}
                <div className=' lg:w-14 lg:h-14 h-12 w-12 mx-auto lg:mx-0 xs:flex-shrink-0'>
                    <Img
                        className='w-full h-full object-cover'
                        src={user.avatar}
                        alt={user.fullName}
                        isCircle
                    />
                </div>
                <div className='xs:hidden ml-3 lg:flex flex-col gap-y-1 overflow-hidden flex-1'>
                    <div className='font-semibold flex items-center'>
                        <p className='text-sm'>{user.fullName}</p>
                        <span className='ml-1 mt-0.5'>
                            {user.verify && (
                                <Icon
                                    className='text-primary text-sm'
                                    icon='ph:seal-check-fill'
                                />
                            )}
                        </span>
                    </div>
                    {user.message && (
                        <p className='text-xs text-[#737373] whitespace-nowrap text-ellipsis overflow-hidden'>
                            <span className='font-medium'>
                                {user.message.idUser !== user._id ? 'You:' : ''}
                            </span>
                            <span className='px-px'></span>
                            {user.message.message}
                        </p>
                    )}
                </div>
            </div>
            {user.message && !user.message.isSeen && user.message.idUser === user._id && (
                <Icon
                    className='text-3xl text-primary block xs:hidden lg:block'
                    icon='radix-icons:dot-filled'
                />
            )}
        </div>
    )
}

export default AccountChat
