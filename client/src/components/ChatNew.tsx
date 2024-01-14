import { Icon } from '@iconify/react'
import Button from '~/components/Button'
import OverLay from '~/components/OverLay'

interface Props {
    onClose: () => void
}
const Account = () => {
    return (
        <div className='flex items-center hover:bg-[#f1f1f1d4] px-6 py-2'>
            <div className='w-11 h-11 rounded-[50%] overflow-hidden mr-3 border border-[#ccc]'>
                <img
                    src='https://images.unsplash.com/photo-1685714630051-9d231fb96992?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=437&q=80'
                    alt=''
                />
            </div>
            <div className='text-sm'>
                <div className='flex items-center'>
                    <p>Son Tung MTP</p>
                    <Icon className='text-primary text-sm' icon='ph:seal-check-fill' />
                </div>
                <p className='text-[#737373]'>sontungmtp</p>
            </div>
        </div>
    )
}
const ChatNew = ({ onClose }: Props) => {
    return (
        <OverLay onClose={onClose}>
            <div className='bg-white w-[550px] rounded-2xl m-5'>
                <div className='flex items-center justify-end py-1'>
                    <div className='w-14'></div>
                    <h3 className='text-center flex-1 font-bold'>Tin nhắn mới</h3>
                    <Icon onClick={onClose} className='p-2 w-11 h-11 mx-4 cursor-pointer' icon='ic:sharp-close' />
                </div>
                <div className='flex items-center px-6 py-5 border-b border-t border-[#ccc]'>
                    <p className='font-semibold'>Tới:</p>
                    <div className='flex-1 ml-6 flex items-center flex-wrap gap-3'>
                        <div className='flex items-center text-primary bg-[#e0f1ff] px-2 py-1 rounded-2xl'>
                            <p className='text-sm font-medium ml-1 cursor-pointer hover:text-black'>Hip Toan</p>
                            <Icon className='pt-1 text-2xl cursor-pointer' icon='ic:round-close' />
                        </div>
                        <input
                            className='pl-4 flex-1 placeholder:text-gray-500 text-sm'
                            type='text'
                            name=''
                            id=''
                            placeholder='Tìm kiếm...'
                        />
                    </div>
                </div>
                <div className='py-6 h-[270px] max-h-[270px]'>
                    {/* <p className="text-sm px-6">Không tìm thấy tài khoản.</p> */}
                    <Account />
                </div>
                <div className='mx-6 py-4'>
                    <Button className='w-full h-11'>Chat</Button>
                </div>
            </div>
        </OverLay>
    )
}

export default ChatNew
