import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import getNotification from '~/apis/getNotification'
import Button from '~/components/Button'
import Img from '~/components/Img'
import socket from '~/socketIo'
import { Notification } from '~/types/chat'
interface Props {
    handleClickOutside: (event: MouseEvent) => void
}
const Notify: React.FC<Props> = ({ handleClickOutside }) => {
    const [notification, setNotification] = useState<Notification[]>([])
    const { data } = useQuery({
        queryKey: ['notification'],
        queryFn: () => getNotification(),
    })
    useEffect(() => {
        socket.on('notification', (data) => setNotification((prev) => [data, ...prev]))
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            socket.off('notification')
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [handleClickOutside])
    return (
        <div
            className={classNames(
                'h-full bg-white rounded-tr-xl rounded-br-xl relative',
                'shadow-2xl transition-all z-50 border-r border-solid border-[#ccc]/80',
            )}
        >
            <h2 className={classNames('py-4 px-5 border-b font-bold text-2xl sticky top-0 bg-white shadow-md z-20')}>
                Notification
            </h2>
            <div className='px-5 overflow-auto h-full'>
                {!data?.length && <p className='text-center mt-6'>No notification</p>}
                <div className='py-2'>
                    {data &&
                        data.map((item, index) => (
                            <div
                                key={index}
                                className={classNames(
                                    'flex items-center justify-between gap-3 py-2 px-4 my-1',
                                    'overflow-hidden hover:bg-gray-100 rounded-lg transition-all',
                                )}
                            >
                                <div className='flex gap-3'>
                                    <Img
                                        src={item.fromUser.avatar}
                                        alt=''
                                        className='w-10 h-10 object-cover rounded-[50%] flex-shrink-0'
                                    />
                                    <div className='text-sm text-dot mt-1'>
                                        <p className='font-semibold inline-block pr-1'>{item.fromUser.userName}</p>
                                        {item.content}
                                        <p className='font-semibold inline-block pl-1'>{item.idPosts.title}</p>
                                    </div>
                                </div>
                                <div className='ml-2'>
                                    <Button type='text' disable>
                                        open
                                    </Button>
                                </div>
                            </div>
                        ))}
                    {notification.map((item, index) => (
                        <div
                            key={index}
                            className={classNames(
                                'flex items-center justify-between gap-3 p-2 my-1',
                                'overflow-hidden hover:bg-gray-100 rounded-lg transition-all',
                            )}
                        >
                            <div className='flex gap-3'>
                                <Img
                                    src={item.fromUser.avatar}
                                    alt=''
                                    className='w-10 h-10 object-cover rounded-[50%] flex-shrink-0'
                                />
                                <div className='text-sm text-dot mt-1'>
                                    <p className='font-semibold inline-block pr-1'>{item.fromUser.userName}</p>
                                    {item.content}
                                    <p className='font-semibold inline-block pl-1'>{item.idPosts.title}</p>
                                </div>
                            </div>
                            <div className='ml-2'>
                                <Button type='text' disable>
                                    open
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Notify
