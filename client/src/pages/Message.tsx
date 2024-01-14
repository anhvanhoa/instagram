// import ChatNew from '~/components/ChatNew'
import { useParams } from 'react-router-dom'
import BoxChat from '~/components/BoxChat'
import IconApp from '~/assets/icons/IconApp'
import { useQuery } from '@tanstack/react-query'
import { initializeUser } from '~/store/constant'
import getUser from '~/apis/getUser'
import getChat from '~/apis/getChat'
import useContextUser from '~/store/hook'
import NotMessage from '~/components/NotMessage'
import classNames from 'classnames'
import NotMessageSkeleton from '~/components/NotMessageSkeleton'
import AccountChatSkeleton from '~/components/AccountChatSkeleton'
import userChat from '~/apis/userChat'
import ListAccountChat from '~/components/ListAccountChat'

const Message = () => {
    const { state } = useContextUser()
    const params = useParams()
    const { data } = useQuery({
        queryKey: ['user-chat', params.username, params.id],
        queryFn: () => getUser(params.username || ''),
        enabled: Boolean(params.username) || Boolean(params.id),
        initialData: initializeUser,
    })
    const { data: dataUser, isLoading: isLoadingUser } = useQuery({
        queryKey: ['users-chat'],
        queryFn: () => userChat(),
        refetchOnMount: 'always',
    })
    const { data: dataChat, isLoading } = useQuery({
        queryKey: ['chat-data', params.username, params.id],
        queryFn: () => getChat(params.id || ''),
        enabled: Boolean(params.username) || Boolean(params.id),
    })
    return (
        <main className='w-full'>
            <div className='grid grid-cols-[80px,_1fr] lg:grid-cols-[350px,_1fr]'>
                <div className='border-[#ccc] border-r h-screen overflow-y-hidden'>
                    {isLoadingUser && <AccountChatSkeleton />}
                    <div className={classNames({ hidden: isLoadingUser })}>
                        <div className='lg:flex items-center justify-between pt-5 px-6 pb-3 hidden'>
                            <h2 className='text-xl font-bold'>{state.fullName}</h2>
                            <div className='px-2 cursor-pointer'>
                                <IconApp type='pen' />
                            </div>
                        </div>
                        <div className='lg:mt-6 border-y border-[#ccc] text-neutral-500'>
                            <p
                                className={classNames(
                                    'py-3 lg:text-left lg:pl-6 text-center text-sm',
                                    'font-semibold cursor-pointer text-black',
                                )}
                            >
                                Primary
                            </p>
                        </div>
                        {dataUser && <ListAccountChat dataUser={dataUser} />}
                    </div>
                </div>
                <div>
                    {isLoading && <NotMessageSkeleton />}
                    {(!params.id || !params.username) && <NotMessage />}
                    {params.id && params.username && dataChat && (
                        <BoxChat idUser={state._id} dataChat={dataChat} userChat={data} />
                    )}
                </div>
            </div>
        </main>
    )
}

export default Message
