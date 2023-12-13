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
import useContextUser from '~/store/hook'
import registerFacebook from '~/apis/registerFacebook'
const initData: LoginData = {
    emailTellName: '',
    email: null,
    numberPhone: null,
    userName: null,
    password: '',
}
const Login = () => {
    const navigation = useNavigate()
    const { dispatch } = useContextUser()
    const [formData, setFormData] = useState<LoginData>(initData)
    // handle change input
    const handleChange = (name: keyof LoginData) => (event: React.ChangeEvent<HTMLInputElement>) =>
        setFormData((prev) => ({ ...prev, [name]: event.target.value }))
    // tanStack
    const { mutate, isError, isPending } = useMutation({
        mutationFn: (body: LoginData) => login(body),
    })
    // Handle login
    const handleLogin = () => {
        if (isEmail(formData.emailTellName)) formData.email = formData.emailTellName
        if (isMobilePhone(formData.emailTellName)) formData.numberPhone = formData.emailTellName
        const regex = new RegExp('!/^[^s!@#$%^&*()_+{}\\[]:;<>,.?~\\/-]+$/')
        if (regex.test(formData.emailTellName)) formData.email = formData.emailTellName
        mutate(formData, {
            onSuccess: (user) => {
                dispatch({ payload: user, type: 'LOGIN' })
                navigation('/')
            },
        })
    }
    // handle login facebook
    const handleLoginFB = async () => {
        try {
            const user = await registerFacebook()
            dispatch({ payload: user, type: 'LOGIN' })
            navigation('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <WrapperAuth>
            <div id='verify'></div>
            <form action='' className='mt-8'>
                <InputAuth value={formData.emailTellName} onChange={handleChange('emailTellName')} type='text'>
                    Số di động, tên người dùng hoặc email
                </InputAuth>
                <InputAuth value={formData.password} onChange={handleChange('password')} type='password'>
                    Mật khẩu
                </InputAuth>
                <Button loading={isPending} onClick={handleLogin} className='mx-auto mt-4' size='extraLarge'>
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
                        onClick={handleLoginFB}
                        iconL={<Icon icon='uiw:facebook' />}
                        size='custom'
                        type='custom'
                        className='mx-auto text-hover-button'
                    >
                        Đăng nhập bằng Facebook
                    </Button>
                </div>
                {isError && (
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
