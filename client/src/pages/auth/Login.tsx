import WrapperAuth from '~/components/WrapperAuth'
import InputAuth from '~/components/InputAuth'
import Button from '~/components/Button'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
const Login = () => {
    return (
        <WrapperAuth>
            <form action='' className='mt-8'>
                <InputAuth type='text'>Số di động, tên người dùng hoặc email</InputAuth>
                <InputAuth type='password'>Mật khẩu</InputAuth>
                <Button disable className='mx-auto mt-4' size='extraLarge'>
                    Đăng nhập
                </Button>
            </form>
            <div>
                <div className='flex items-center mx-10 mt-3'>
                    <div className='h-[1px] bg-[#ccc] flex-1'></div>
                    <p className='mx-4 uppercase text-xs font-medium text-gray-400'>hoặc</p>
                    <div className='h-[1px] bg-[#ccc] flex-1'></div>
                </div>
                <div className='mx-11'>
                    <Button
                        iconL={<Icon icon='uiw:facebook' />}
                        size='custom'
                        type='custom'
                        className='mx-auto text-hover-button'
                    >
                        Đăng nhập bằng Facebook
                    </Button>
                </div>
                {true && (
                    <p className='text-red-600 text-center text-sm px-10 pt-2'>
                        Rất tiếc, mật khẩu của bạn không đúng. Vui lòng kiểm tra lại mật khẩu.
                    </p>
                )}
                <div className='cursor-pointer my-5'>
                    <Link to='/account/forgot-password' className='text-xs text-center block'>
                        Quên mật khẩu?
                    </Link>
                </div>
            </div>
        </WrapperAuth>
    )
}

export default Login
