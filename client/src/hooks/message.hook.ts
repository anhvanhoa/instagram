import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import getChat from '~/apis/getChat'
import getUser from '~/apis/getUser'
import roomRequest from '~/apis/roomRequest'
import usersChatRequest from '~/apis/usersChatRequest'
import { initUserFollow } from '~/constants/user'

const useUserChat = ({ username }: { username: string }) => {
    return useQuery({
        queryKey: ['user-chat', username],
        queryFn: () => getUser(username),
        enabled: Boolean(username),
        initialData: initUserFollow,
    })
}

const useUserChats = () => {
    return useQuery({
        queryKey: ['users-chat'],
        queryFn: () => usersChatRequest(),
    })
}

const useChatSection = ({ id }: { id: string }) => {
    return useQuery({
        queryKey: ['chat-data', id],
        queryFn: () => getChat(id),
        enabled: Boolean(id),
    })
}

const useRoom = ({ userName }: { userName: string }) => {
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ['room'],
        mutationFn: (id: string) => roomRequest(id),
        onSuccess: (idRoom) => {
            navigate(`/message/${userName}/t/${idRoom}`)
        },
    })
}

export { useUserChat, useUserChats, useChatSection, useRoom }
