import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Button from '~/components/Button'
import InputAuth from '~/components/InputAuth'
import React, { useEffect, useState, useCallback } from 'react'
import classNames from 'classnames'
import isEmail from 'validator/lib/isEmail'
import isTell from 'validator/lib/isMobilePhone'
import matches from 'validator/lib/matches'
import uniqueUser, { TypeUniqueUser } from '~/apis/uniqueUser'
import { useMutation } from '@tanstack/react-query'
import { DataRegister, UniqueUser } from '~/types/register'

type Validate = Record<keyof DataRegister, 'success' | 'error' | 'not'>

const initValidate: Omit<Validate, 'numberPhone' | 'birthday' | 'otp'> = {
    email: 'not',
    fullName: 'not',
    userName: 'not',
    password: 'not',
}

interface Props {
    dataForm: DataRegister
    setDataFrom: (value: React.SetStateAction<DataRegister>) => void
    handleStep: (type: 'next' | 'prev') => () => void // currying
}

const Register: React.FC<Props> = ({ dataForm, setDataFrom, handleStep }) => {
    const [btnDisable, setBtnDisable] = useState(true)
    const [typePass, setTypePass] = useState<'text' | 'password'>('password')
    const [validate, setValidate] = useState<Omit<Validate, 'numberPhone' | 'birthday' | 'otp'>>(initValidate)
    // tanStack
    const { mutate } = useMutation({
        mutationFn: (body: UniqueUser) => uniqueUser(body),
        onSuccess: handleSuccess,
    })
    // Handle disable
    const handleDisable = useCallback(() => Object.values(validate).some((item) => item !== 'success'), [validate])
    useEffect(() => {
        setBtnDisable(handleDisable())
    }, [handleDisable, validate])
    // Handle Focus
    const handleFocus = (name: keyof DataRegister) => () => setValidate((prev) => ({ ...prev, [name]: 'not' }))
    // Handle change type password
    const handleHiddenOrShowPass = () => setTypePass((prev) => (prev == 'text' ? 'password' : 'text'))
    // Match email or tell or username
    const handleMatch = (value: string) => {
        if (isEmail(value)) return { email: value }
        if (isTell(value, 'vi-VN')) return { numberPhone: value }
        if (matches(value, /^[^\s!@#$%^&*()_+{}\\[\]:;<>,.?~\\/-]+$/)) return { userName: value }
    }
    // Handle validate
    const handleValidate = (type: string, isSuccess: boolean) => {
        if (isSuccess) {
            if (type === 'email' || type === 'tell') setValidate((prev) => ({ ...prev, email: 'error' }))
            setValidate((prev) => ({ ...prev, [type]: 'error' }))
        } else {
            if (type === 'email' || type === 'tell') setValidate((prev) => ({ ...prev, email: 'success' }))
            setValidate((prev) => ({ ...prev, [type]: 'success' }))
        }
    }
    // handleSuccess
    function handleSuccess(data: TypeUniqueUser) {
        if (data.type === 'tell') data.type = 'email'
        handleValidate(data.type, data.unique)
    }
    // Change input || currying
    const handleChange = (name: keyof DataRegister) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setDataFrom((prev) => ({ ...prev, [name]: value }))
        if (value.length >= 6 && name === 'password') handleValidate(name, false)
    }
    // Blur input || currying
    const handleBlur = (name: keyof DataRegister) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const is6Char = value.length < 6
        if (is6Char && value) handleValidate(name, true)
        if (name === 'email' && value && !is6Char) {
            const result = handleMatch(value)
            result && !result.userName ? mutate(result) : setValidate((prev) => ({ ...prev, [name]: 'error' }))
        } else if (name === 'userName' && value && !is6Char) {
            const result = handleMatch(value)
            result ? mutate(result) : setValidate((prev) => ({ ...prev, [name]: 'error' }))
        } else if (name === 'fullName' && value && !is6Char) handleValidate(name, false)
        else if (name === 'password' && value && !is6Char) handleValidate(name, false)
    }
    return (
        <div>
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
                <form className='mt-4'>
                    <InputAuth
                        onFocus={handleFocus('email')}
                        onBlur={handleBlur('email')}
                        onChange={handleChange('email')}
                        value={dataForm.email || ''}
                        isSuccess={validate.email === 'success'}
                        isError={validate.email === 'error'}
                        type='text'
                    >
                        Số di động hoặc email
                    </InputAuth>
                    <InputAuth
                        onFocus={handleFocus('fullName')}
                        onBlur={handleBlur('fullName')}
                        onChange={handleChange('fullName')}
                        value={dataForm.fullName}
                        isSuccess={validate.fullName === 'success'}
                        isError={validate.fullName === 'error'}
                        type='text'
                    >
                        Tên đầy đủ
                    </InputAuth>
                    <InputAuth
                        onFocus={handleFocus('userName')}
                        onBlur={handleBlur('userName')}
                        onChange={handleChange('userName')}
                        value={dataForm.userName}
                        isSuccess={validate.userName === 'success'}
                        isError={validate.userName === 'error'}
                        type='text'
                    >
                        Tên người dùng
                    </InputAuth>
                    <div className='relative'>
                        <InputAuth
                            onBlur={handleBlur('password')}
                            onChange={handleChange('password')}
                            value={dataForm.password}
                            type={typePass}
                        >
                            Mật khẩu
                        </InputAuth>
                        <Button
                            onClick={handleHiddenOrShowPass}
                            className={classNames('text-black text-xs absolute top-1/2 -translate-y-1/2 right-12', {
                                hidden: !dataForm.password,
                            })}
                            type='text'
                        >
                            {typePass === 'text' ? 'Ẩn' : 'Hiển thị'}
                        </Button>
                    </div>
                    <div className='mx-12 text-xs text-center text-gray-500 leading-4'>
                        <p className='pt-1'>
                            Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên
                            Instagram.
                            <Link className='pl-1 text-hover-button' to=''>
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
                    <Button
                        disable={btnDisable}
                        onClick={handleStep('next')}
                        className='mx-auto mt-4'
                        size='extraLarge'
                    >
                        Đăng ký
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Register
