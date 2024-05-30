import InfoChat from './InfoChat'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { User } from '~/types/auth'
import { ContentChat } from '~/types/chat'
import BoxMessage from './BoxMessage'
import InputChat from '~/components/InputChat'
import HeaderChat from './HeaderChat'
import socket from '~/socketIo'
import { useParams } from 'react-router-dom'
import Button from './Button'
import { useUnblock } from '~/hooks/user.hook'

interface Props {
    userChat: User
    dataChat: ContentChat[]
    idUser: string
    blockByUser: boolean
    isBlock: boolean
}
const BoxChat: React.FC<Props> = ({
    userChat,
    dataChat,
    idUser,
    blockByUser,
    isBlock,
}) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState<string>('')
    const [messageNew, setMessageNew] = useState<ContentChat[]>(dataChat)
    const params = useParams()
    const unblock = useUnblock({ username: userChat.userName })
    const handleSend = () => {
        socket.emit(`chat`, params.id!, {
            message,
            type: 'text',
        })
        setMessage('')
    }
    const handleUnblock = () => {
        unblock.mutate(userChat._id)
    }
    useLayoutEffect(() => {
        if (contentRef.current) {
            const position =
                contentRef.current?.scrollHeight - contentRef.current?.offsetHeight
            contentRef.current.scrollTo({ top: position })
        }
    }, [messageNew, dataChat, userChat._id])
    useEffect(() => {
        socket.emit(`joinRoom`, params.id!)
        socket.on(`notifyDelete`, (data) => {
            setMessageNew((prev) =>
                prev.map((item) => {
                    if (item._id === data._id) return data
                    return item
                }),
            )
        })
        socket.on(`message`, (data) => {
            setMessageNew((prev) => [...prev, data])
            if (data.idUser === userChat._id)
                setTimeout(() => socket.emit(`seen`, data._id), 3000)
        })
        setMessageNew(dataChat)
        return () => {
            socket.emit(`leaveRoom`, params.id!)
            socket.off('message')
            socket.off('notifyDelete')
        }
    }, [dataChat, idUser, params.id, userChat._id])
    return (
        <section className='flex flex-col h-screen justify-between'>
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
                            time={item.createdAt}
                            isDelete={
                                (item.isDeleteReceive && item.idUser === userChat._id) ||
                                (item.isDeleteSend && item.idUser !== userChat._id)
                            }
                        />
                    ))}
                </div>
            </div>
            <div className='mb-14 md:mb-0'>
                {!blockByUser && !isBlock && (
                    <InputChat
                        value={message}
                        setValue={setMessage}
                        onSend={handleSend}
                    />
                )}
                {blockByUser && (
                    <div className='text-center py-3 text-red-600 border-t'>
                        You cannot message this user
                    </div>
                )}
                {isBlock && (
                    <div className='flex justify-center py-2 border-t'>
                        <Button
                            onClick={handleUnblock}
                            size='small'
                            className='bg-primary'
                        >
                            Unblock
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default BoxChat
