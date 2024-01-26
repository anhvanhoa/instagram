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
import HeaderMobile from '~/components/HeaderMobile'

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
        <main className='w-full h-full flex flex-col'>
            <HeaderMobile
                title='Chat'
                className={classNames('xs:hidden', {
                    hidden: params.id && params.username,
                })}
            />
            <div className='grid grid-cols-1 xs:grid-cols-[65px,_1fr] lg:grid-cols-[350px,_1fr] flex-1 overflow-hidden'>
                <div
                    className={classNames('border-second xs:border-r overflow-y-hidden xs:block', {
                        hidden: params.id && params.username,
                    })}
                >
                    {isLoadingUser && <AccountChatSkeleton />}
                    <div
                        className={classNames('h-full flex flex-col overflow-auto scrollbar-hidden', {
                            hidden: isLoadingUser,
                        })}
                    >
                        <div className='sticky top-0 lg:flex items-center justify-between px-6 py-5 hidden border-b border-second bg-[rgba(var(--background-third-rgb),0.8)] backdrop-blur-md z-10'>
                            <h2 className='text-xl font-bold'>{state.fullName}</h2>
                            <div className='px-2 cursor-pointer'>
                                <IconApp type='pen' />
                            </div>
                        </div>
                        <div className=''>{dataUser && <ListAccountChat dataUser={dataUser} />}</div>
                    </div>
                </div>
                <div
                    className={classNames('xs:block overflow-hidden', {
                        hidden: !params.id || !params.username,
                    })}
                >
                    {(isLoading || isLoadingUser) && !data._id && <NotMessageSkeleton />}
                    {(!params.id || !params.username) && !data._id && dataUser && <NotMessage />}
                    {params.id && params.username && dataChat && (
                        <BoxChat idUser={state._id} dataChat={dataChat} userChat={data} />
                    )}
                </div>
            </div>
        </main>
    )
}

export default Message
