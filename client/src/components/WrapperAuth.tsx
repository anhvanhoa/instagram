import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import images from '~/assets'
import Button from '~/components/Button'

interface Props {
    children: React.ReactNode
    isAccount?: boolean
    isLogo?: boolean
}
const boxAccounts = {
    login: {
        content: 'Do you already have an account ?',
        link: '/accounts/login',
        button: 'Login',
    },
    register: {
        content: 'Do not have an account ?',
        link: '/accounts/signup',
        button: 'Register',
    },
}
const WrapperAuth: React.FC<Props> = ({ children, isAccount, isLogo }) => {
    const [account] = useState(() => (isAccount ? boxAccounts.login : boxAccounts.register))
    const switchLoginOrRegister = () => {
        const isLogin = Boolean(sessionStorage.getItem('loginOrRegister'))
        !isLogin ? sessionStorage.setItem('loginOrRegister', 'true') : sessionStorage.clear()
    }
    return (
        <section className='flex justify-center sm:mt-5'>
            <section className='w-96 p-2'>
                <div className='rounded-md sm:border'>
                    <div className='mt-8 mb-3'>
                        {isLogo || <img className='mx-auto w-44 h-12' src={images.logoText} alt='logo' />}
                    </div>
                    <div className='mb-8'>{children}</div>
                </div>
                <div className='flex items-center justify-center text-sm sm:border py-4 mt-4 rounded-md'>
                    <span className='pr-1'>{account.content}</span>
                    <Link onClick={switchLoginOrRegister} to={account.link}>
                        <Button type='text'>{account.button}</Button>
                    </Link>
                </div>
                <p className='text-center text-sm mt-8'>Get the app</p>
                <div className='flex justify-center mt-4 gap-x-3 pb-10'>
                    <img className='h-10' src={images.downloadChPlay} alt='Download ChPlay' />
                    <img className='h-10' src={images.downloadMicrosoft} alt='Download Microsoft' />
                </div>
            </section>
        </section>
    )
}

export default WrapperAuth
