import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import getNotification from '~/apis/getNotification'
import ItemNotify from '~/components/ItemNotify'
import socket from '~/socketIo'
import { Notification } from '~/types/chat'
interface Props {
    handleClickOutside: (event: MouseEvent) => void
    handleClose: () => void
}
const Notify: React.FC<Props> = ({ handleClickOutside, handleClose }) => {
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
                'h-full rounded-tr-3xl rounded-br-3xl relative',
                'shadow-2xl transition-all z-50 overflow-hidden',
            )}
        >
            <h2
                className={classNames(
                    'py-4 px-5 border-b font-medium text-2xl',
                    'sticky top-0 z-20 border-gray-50/10',
                )}
            >
                Notification
            </h2>
            <div className='px-5 overflow-auto h-full'>
                {!data?.length && <p className='text-center mt-6'>No notification</p>}
                <div className='py-2'>
                    {data &&
                        data.map((item, index) => (
                            <div key={index} onClick={handleClose}>
                                <ItemNotify notify={item} />
                            </div>
                        ))}
                    {notification &&
                        notification.map((item, index) => (
                            <div key={index} onClick={handleClose}>
                                <ItemNotify notify={item} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Notify
