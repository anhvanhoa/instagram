import WrapperAuth from '~/components/WrapperAuth'
import InputAuth from '~/components/InputAuth'
import Button from '~/components/Button'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { LoginData } from '~/types/auth'
import { useMutation } from '@tanstack/react-query'
import login from '~/apis/login'
import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
import { useNavigate } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'
import registerFacebook from '~/apis/registerFacebook'
import socket from '~/socketIo'
const initData: LoginData = {
    emailTellName: '',
    email: null,
    numberPhone: null,
    userName: null,
    password: '',
}
const Login = () => {
    const navigation = useNavigate()
    const { setUser } = useAuth()
    const [formData, setFormData] = useState<LoginData>(initData)
    // handle change input
    const handleChange =
        (name: keyof LoginData) => (event: React.ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({ ...prev, [name]: event.target.value }))
    // tanStack
    const requetLogin = useMutation({
        mutationFn: (body: LoginData) => login(body),
        onSuccess(user) {
            navigation('/')
            setUser(user)
            socket.connect().auth = { token: user.accessToken }
        },
    })
    // Handle login
    const handleLogin = () => {
        if (isEmail(formData.emailTellName)) formData.email = formData.emailTellName
        if (isMobilePhone(formData.emailTellName))
            formData.numberPhone = formData.emailTellName
        const regex = /^[^\s!@#$%^&*()_+{}[\]:;<>,.?~\\/-]+$/
        if (!isMobilePhone(formData.emailTellName) && regex.test(formData.emailTellName))
            formData.userName = formData.emailTellName
        requetLogin.mutate(formData)
        setFormData((prev) => ({
            ...initData,
            emailTellName: prev.emailTellName,
            password: prev.password,
        }))
    }
    // handle login facebook
    const handleLoginFB = async () => {
        try {
            await registerFacebook()
            setTimeout(() => navigation('/'), 400)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <WrapperAuth>
            <div id='verify'></div>
            <form
                className='mt-8'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleLogin()
                }}
            >
                <InputAuth
                    value={formData.emailTellName}
                    onChange={handleChange('emailTellName')}
                    type='text'
                >
                    Mobile number, username or email
                </InputAuth>
                <InputAuth
                    value={formData.password}
                    onChange={handleChange('password')}
                    type='password'
                >
                    Password
                </InputAuth>
                <Button
                    loading={requetLogin.isPending}
                    onClick={handleLogin}
                    className='mx-auto mt-4'
                    size='extraLarge'
                >
                    Login
                </Button>
            </form>
            <div>
                <div className='flex items-center mx-10 mt-3'>
                    <div className='h-[1px] bg-[#ccc] flex-1'></div>
                    <p className='mx-4 uppercase text-xs font-medium text-gray-400'>or</p>
                    <div className='h-[1px] bg-[#ccc] flex-1'></div>
                </div>
                <div className='mx-11'>
                    <Button
                        onClick={handleLoginFB}
                        iconL={<Icon icon='uiw:facebook' />}
                        size='custom'
                        type='custom'
                        className='mx-auto text-hover-button'
                    >
                        Login with Facebook
                    </Button>
                </div>
                {requetLogin.isError && (
                    <p className='text-red-600 text-center text-sm px-10 pt-2'>
                        Sorry, your password is incorrect. Please check your password
                        again.
                    </p>
                )}
                <div className='cursor-pointer my-5'>
                    <Link
                        to='/account/forgot-password'
                        className='text-xs text-center block'
                    >
                        Forgot password?
                    </Link>
                </div>
            </div>
        </WrapperAuth>
    )
}

export default Login
