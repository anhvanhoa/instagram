import classNames from 'classnames'
import Img from './Img'
import { Icon } from '@iconify/react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import SettingMessage from './SettingMessage'
import socket from '~/socketIo'
type TypePosition = 'left' | 'right'
interface Props {
    message: string
    avatar: string
    position?: TypePosition
    idChat: string
    idUser: string
}
const BoxMessage: React.FC<Props> = ({ message, avatar, position = 'left', idChat, idUser }) => {
    const positionType: Record<TypePosition, string> = {
        left: 'bg-second',
        right: 'bg-primary text-white',
    }
    const handleDeleteSend = () => {
        socket.emit('delete', {
            idContentChat: idChat,
            idUser,
            idUserisDeleteReceive: false,
            isDeleteSend: true,
        })
    }
    const handleDeleteReceive = () => {
        socket.emit('delete', {
            idContentChat: idChat,
            idUser,
            idUserisDeleteReceive: true,
            isDeleteSend: false,
        })
    }
    return (
        <div
            className={classNames({
                'flex items-end': position === 'left',
                'flex justify-end': position === 'right',
            })}
        >
            <div className='max-w-[70%] flex items-end gap-2'>
                {position === 'left' && avatar && <Img src={avatar} className='w-6 h-6 rounded-[50%] object-cover ' />}
                {position === 'right' && (
                    <Tippy
                        className='rounded-xl'
                        interactive
                        placement='left'
                        theme='light'
                        trigger='click'
                        content={<SettingMessage onClick={handleDeleteSend} />}
                    >
                        <div className='px-2 py-1'>
                            <Icon icon='solar:menu-dots-bold' className='cursor-pointer' />
                        </div>
                    </Tippy>
                )}
                <div>
                    <p className={classNames('py-2 px-3 rounded-3xl mt-px inline-block', positionType[position])}>
                        {message}
                    </p>
                </div>
                {position === 'left' && (
                    <Tippy
                        className='rounded-xl'
                        interactive
                        trigger='click'
                        placement='right'
                        theme='light'
                        content={<SettingMessage onClick={handleDeleteReceive} />}
                    >
                        <div className='px-2 py-1 hidden'>
                            <Icon icon='solar:menu-dots-bold' className='cursor-pointer' />
                        </div>
                    </Tippy>
                )}
            </div>
        </div>
    )
}

export default BoxMessage
