import { Link } from 'react-router-dom'
import Button from '~/components/Button'
import React, { useEffect, useState } from 'react'
import images from '~/assets'
import Select from '~/components/Select'
import generateBirthday from '~/utils/generateBirthday'
import { BirthdayType, DataRegister } from '~/types/register'

interface Props {
    birthday: BirthdayType
    setBirthday: (value: React.SetStateAction<BirthdayType>) => void
    dataForm: DataRegister
    sendOtp: (type: string) => void
    handleStep: (type: 'next' | 'prev') => () => void // currying
}
const Birthday: React.FC<Props> = ({ birthday, setBirthday, handleStep, dataForm, sendOtp }) => {
    const [btnDisable, setBtnDisable] = useState(true)
    const generate = generateBirthday()
    const years = generate.generateYear()
    const months = generate.generateMoth()
    const days = generate.generateDay(birthday.month, birthday.year)
    const age = generate.checkAge(birthday.year, birthday.month, birthday.day)
    useEffect(() => {
        if (age.age >= 18) setBtnDisable(false)
        else setBtnDisable(true)
    }, [age])
    // Change birthday || currying
    const handleChangBirthday = (name: keyof BirthdayType) => (event: React.ChangeEvent<HTMLSelectElement>) =>
        setBirthday((prev) => ({ ...prev, [name]: event.target.value }))
    const handleNextOtp = () => {
        if (age.age >= 18) {
            dataForm.birthday = age.birthday
            sendOtp('next')
        }
    }
    return (
        <div>
            <div className='text-center px-10'>
                <div className='flex flex-col items-center text-center gap-1 text-sm leading-4'>
                    <div className='w-36 h-24 mt-3' style={{ background: `url(${images.synthetic})` }}></div>
                    <p className='font-medium py-2'>Thêm ngày sinh</p>
                    <p className=''>Thông tin này sẽ không hiển thị trên trang cá nhân công khai của bạn.</p>
                    <Link to='/' className='text-primary'>
                        Tại sao tôi cần cung cấp ngày sinh của mình?
                    </Link>
                    <div className='flex items-center gap-4 my-3'>
                        <Select setValue={handleChangBirthday('month')} valueDefault={birthday.month} data={months}>
                            Tháng
                        </Select>
                        <Select setValue={handleChangBirthday('day')} valueDefault={birthday.day} data={days}>
                            Ngày
                        </Select>
                        <Select setValue={handleChangBirthday('year')} valueDefault={birthday.year} data={years}>
                            Năm
                        </Select>
                    </div>
                </div>
                <p className='text-xs text-gray-600'>Bạn cần nhập ngày sinh của mình</p>
                <p className='text-xs text-gray-600 py-4'>
                    Hãy thêm ngày sinh của chính bạn, dù đây là tài khoản dành cho doanh nghiệp, thú cưng hay bất cứ
                    điều gì khác
                </p>
                <Button disable={btnDisable} onClick={handleNextOtp} className='w-full'>
                    Tiếp
                </Button>
                <Button onClick={handleStep('prev')} className='mb-2 mx-auto' type='text'>
                    Quay lại
                </Button>
            </div>
        </div>
    )
}

export default Birthday
