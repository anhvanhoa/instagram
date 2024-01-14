import IconApp from '~/assets/icons/IconApp'

const NotMessage = () => {
    return (
        <div className='flex justify-center flex-col items-center text-center h-full gap-y-3'>
            <IconApp type='message-chat' className='h-24' />
            <p className='text-xl'>Tin nhắn của bạn</p>
            <span className='text-sm text-[#737373]'>Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm</span>
        </div>
    )
}

export default NotMessage
