import React, { memo, useEffect, useState } from 'react'
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
    const { state } = useContextUser()
    useEffect(() => {
        socket.on('notifyMessage', (dataChat) => {
            setData((prev) => {
                const a = prev.some((item) => item._id === dataChat._id)
                if (!a) return [dataChat, ...prev]
                return prev.map((item) => {
                    if (item._id === dataChat._id) {
                        return {
                            ...item,
                            chat: dataChat.chat,
                        }
                    }
                    return item
                })
            })
        })
        return () => {
            socket.off('notifyMessage')
        }
    }, [state._id])
    return (
        <div className='h-full'>
            {data.map((user) => (
                <NavLink
                    key={user._id}
                    to={`/message/${user.userName}/t/${user._id}`}
                    className={({ isActive }) =>
                        classNames({
                            'bg-gray-200/70 block': isActive,
                        })
                    }
                >
                    <AccountChat user={user} key={user._id} />
                </NavLink>
            ))}
        </div>
    )
})

export default ListAccountChat
