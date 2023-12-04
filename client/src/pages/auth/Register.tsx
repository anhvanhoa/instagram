import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Button from '~/components/Button'
import WrapperAuth from '~/components/WrapperAuth'
import InputAuth from '~/components/InputAuth'
const Register = () => {
    return (
        <main>
            <WrapperAuth isAccount>
                <div>
                    <p className='text-center font-medium mt-3 text-gray-500 mx-10'>
                        Đăng ký để xem ảnh và video từ bạn bè.
                    </p>
                    <Button
                        iconL={<Icon className='text-xl' icon='uil:facebook' />}
                        className='mx-auto mt-4'
                        size='extraLarge'
                    >
                        Đăng nhập bằng facebook
                    </Button>
                    <div className='flex items-center mx-10 my-3'>
                        <div className='border-t border-[#ccc] flex-1'></div>
                        <p className='mx-4 uppercase text-xs font-medium text-gray-500'>hoặc</p>
                        <div className='border-t border-[#ccc] flex-1'></div>
                    </div>
                    <form action='' className='mt-4'>
                        <InputAuth type='text'>Số di động hoặc email</InputAuth>
                        <InputAuth type='text'>Tên đầy đủ</InputAuth>
                        <InputAuth type='text'>Tên người dùng</InputAuth>
                        <InputAuth type='text'>Mật khẩu</InputAuth>
                        <div className='mx-12 text-sm text-center text-gray-500 leading-4'>
                            <p className='pt-1'>
                                Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên
                                Instagram.{' '}
                                <Link className='text-hover-button' to=''>
                                    Tìm hiểu thêm
                                </Link>
                            </p>
                            <p className='pt-4'>
                                Bằng cách đăng ký, bạn đồng ý với
                                <Link className='text-hover-button px-1' to=''>
                                    Điều khoản, Chính sách quyền riêng tư
                                </Link>
                                và
                                <Link className='text-hover-button px-1' to=''>
                                    Chính sách cookie
                                </Link>
                                của chúng tôi.
                            </p>
                        </div>
                        <Button disable className='mx-auto mt-4' size='extraLarge'>
                            Đăng ký
                        </Button>
                    </form>
                </div>
            </WrapperAuth>
        </main>
    )
}

export default Register
