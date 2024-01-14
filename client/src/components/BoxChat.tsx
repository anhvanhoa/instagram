import InfoChat from './InfoChat'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { User } from '~/types/auth'
import { ContentChat } from '~/types/chat'
import BoxMessage from './BoxMessage'
import InputChat from './InputChat'
import HeaderChat from './HeaderChat'
import socket from '~/socketIo'

interface Props {
    userChat: User
    dataChat: ContentChat[]
    idUser: string
}
const BoxChat: React.FC<Props> = ({ userChat, dataChat, idUser }) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState<string>('')
    const [messageNew, setMessageNew] = useState<ContentChat[]>(dataChat)
    const handleSend = () => {
        socket.emit(`chat`, {
            message,
            idUser,
            idUserChat: userChat._id,
        })
        setMessage('')
    }
    useLayoutEffect(() => {
        if (contentRef.current) {
            const position = contentRef.current?.scrollHeight - contentRef.current?.offsetHeight
            contentRef.current.scrollTo({ top: position })
        }
    }, [messageNew, dataChat, userChat._id])
    useEffect(() => {
        socket.emit(`joinRoom`, userChat._id)
        socket.on(`notifyDelete`, (data) => {
            if (data._id !== userChat._id) return
            setMessageNew((prev) => {
                return prev.filter((item) => item._id !== data.chat._id)
            })
        })
        socket.on(`sendMessage`, (data) => {
            if (data.idUser !== userChat._id) return
            socket.emit(`seen`, { idUser: data.idUser, idContentChat: data._id })
            setMessageNew((prev) => [...prev, data])
        })
        setMessageNew(dataChat)
        return () => {
            socket.emit(`leaveRoom`, userChat._id)
            socket.off('sendMessage')
            socket.off('notifyDelete')
        }
    }, [dataChat, userChat._id])
    return (
        <section className='h-screen flex flex-col justify-between'>
            <HeaderChat user={userChat} />
            <div className='flex-1 overflow-y-scroll' ref={contentRef}>
                <InfoChat user={userChat} />
                <div className='px-4 mt-12 mb-2'>
                    {messageNew.map((item) => (
                        <BoxMessage
                            key={item._id}
                            position={item.idUser === userChat._id ? 'left' : 'right'}
                            avatar={userChat.avatar}
                            message={item.message}
                            idChat={item._id}
                            idUser={userChat._id}
                        />
                    ))}
                </div>
            </div>
            <InputChat value={message} setValue={setMessage} onSend={handleSend} />
        </section>
    )
}

export default BoxChat
