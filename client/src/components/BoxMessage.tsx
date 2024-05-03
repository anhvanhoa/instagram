import classNames from 'classnames'
import Img from './Img'
import { Icon } from '@iconify/react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import SettingMessage from './SettingMessage'
import socket from '~/socketIo'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
type TypePosition = 'left' | 'right'
interface Props {
    message: string
    avatar: string
    position?: TypePosition
    idChat: string
    idUser: string
    time: string
    isDelete: boolean
}
const BoxMessage: React.FC<Props> = ({ message, avatar, position = 'left', idChat, time, isDelete }) => {
    const [option, setoption] = useState(true)
    const params = useParams()
    const positionType: Record<TypePosition, string> = {
        left: 'dark:bg-second bg-gray-100',
        right: 'bg-primary text-white',
    }
    const handleDeleteSend = () => {
        socket.emit('delete', idChat, {
            isDeleteSend: true,
        })
    }
    const handleDeleteReceive = () => {
        socket.emit('delete', idChat, {
            isDeleteReceive: true,
        })
    }
    const handleRecall = () => {
        socket.emit('recall', idChat, params.id!, {
            isDeleteReceive: true,
            isDeleteSend: true,
        })
    }

    return (
        <div
            className={classNames('group/chat', {
                'my-1.5 flex items-end': position === 'left',
                'my-1.5 flex justify-end': position === 'right',
                hidden: isDelete,
            })}
        >
            <div className='max-w-[70%] flex items-center gap-2 '>
                {position === 'left' && <Img src={avatar} className='w-6 h-6 rounded-[50%] object-cover ' />}
                {position === 'right' && (
                    <Tippy
                        className='rounded-xl'
                        interactive
                        placement='top-end'
                        theme='light'
                        trigger='click'
                        arrow={false}
                        content={
                            <SettingMessage onRecall={handleRecall} isRecall time={time} onClick={handleDeleteSend} />
                        }
                        onShow={() => setoption(false)}
                        onHide={() => setoption(true)}
                    >
                        <div
                            className={classNames('px-2 py-0.5 group-hover/chat:block', {
                                hidden: option,
                            })}
                        >
                            <Icon icon='charm:menu-kebab' className='size-3 cursor-pointer' />
                        </div>
                    </Tippy>
                )}
                <div>
                    <p
                        className={classNames(
                            'text-sm md:text-base py-1.5 px-3 rounded-3xl mt-px inline-block',
                            positionType[position],
                        )}
                    >
                        {message}
                    </p>
                </div>
                {position === 'left' && (
                    <Tippy
                        className='rounded-xl'
                        interactive
                        trigger='click'
                        placement='top-start'
                        theme='light'
                        arrow={false}
                        content={<SettingMessage time={time} onClick={handleDeleteReceive} />}
                        onShow={() => setoption(false)}
                        onHide={() => setoption(true)}
                    >
                        <div
                            className={classNames('px-2 py-0.5 group-hover/chat:block', {
                                hidden: option,
                            })}
                        >
                            <Icon icon='charm:menu-kebab' className='size-3 cursor-pointer' />
                        </div>
                    </Tippy>
                )}
            </div>
        </div>
    )
}

export default BoxMessage
