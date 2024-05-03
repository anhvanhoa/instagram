import React, { memo, useEffect, useLayoutEffect, useState } from 'react'
import AccountChat from './AccountChat'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { UserChat } from '~/types/chat'
import useContextUser from '~/store/hook'
import socket from '~/socketIo'

interface Props {
    dataUser: UserChat[]
}
const ListAccountChat: React.FC<Props> = memo(({ dataUser }) => {
    const [data, setData] = useState(dataUser)
    const { user } = useContextUser()
    useEffect(() => {
        socket.on('notifyMessage', (dataChat) => {
            setData((prev) => {
                const a = prev.some((item) => item.idRoom === dataChat.idRoom)
                if (!a) return [dataChat, ...prev]
                return prev.map((item) => {
                    if (item.idRoom === dataChat.idRoom) {
                        return {
                            ...item,
                            message: dataChat.message,
                        }
                    }
                    return item
                })
            })
        })
        return () => {
            socket.off('notifyMessage')
        }
    }, [user._id])
    useLayoutEffect(() => {
        setData(dataUser)
    }, [dataUser])
    return (
        <div className='h-full'>
            {data.map((user) => {
                return (
                    <NavLink
                        key={user._id}
                        to={`/message/${user.userName}/t/${user.idRoom}`}
                        className={({ isActive }) =>
                            classNames({
                                'border-l-4 border-sky-500 block': isActive,
                            })
                        }
                    >
                        <AccountChat user={user} key={user._id} />
                    </NavLink>
                )
            })}
        </div>
    )
})

export default ListAccountChat
