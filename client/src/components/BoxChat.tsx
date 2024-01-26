import InfoChat from './InfoChat'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { User } from '~/types/auth'
import { ContentChat } from '~/types/chat'
import BoxMessage from './BoxMessage'
import InputChat from '~/components/InputChat'
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
            setMessageNew((prev) => prev.filter((item) => item._id !== data.chat._id))
        })
        socket.on(`sendMessage`, (data) => {
            if (data.idUserChat === userChat._id || data.idUser === userChat._id) {
                setMessageNew((prev) => [...prev, data])
                if (data.idUser === userChat._id) socket.emit(`seen`, { idUser: data.idUser, idContentChat: data._id })
            }
        })
        setMessageNew(dataChat)
        return () => {
            socket.emit(`leaveRoom`, userChat._id)
            socket.off('sendMessage')
            socket.off('notifyDelete')
        }
    }, [dataChat, idUser, userChat._id])
    return (
        <section className='flex flex-col h-full justify-between'>
            <div className='flex-1 overflow-auto scrollbar' ref={contentRef}>
                <div className='sticky top-0 bg-[rgba(var(--background-third-rgb),0.9)] backdrop-blur-md'>
                    <HeaderChat user={userChat} />
                </div>
                <InfoChat user={userChat} />
                <div className='px-4 mt-12 mb-2 pb-6'>
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
            <div className='mb-14 md:mb-0'>
                <InputChat value={message} setValue={setMessage} onSend={handleSend} />
            </div>
        </section>
    )
}

export default BoxChat
