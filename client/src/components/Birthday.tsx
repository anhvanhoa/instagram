import { Link } from 'react-router-dom'
import Button from '~/components/Button'
import React, { useEffect, useState } from 'react'
import images from '~/assets'
import Select from '~/components/Select'
import generateBirthday from '~/utils/generateBirthday'
import { BirthdayType, DataRegister } from '~/types/auth'

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
                <div id='verify'></div>
                <div className='flex flex-col items-center text-center gap-1 text-sm leading-4'>
                    <div className='w-36 h-24 mt-3' style={{ background: `url(${images.synthetic})` }}></div>
                    <p className='font-medium py-2'>Add date of birth</p>
                    <p className=''>This information will not appear on your public profile.</p>
                    <Link to='/' className='text-primary'>
                        Why do I need to provide my date of birth?
                    </Link>
                    <div className='flex items-center gap-4 my-3'>
                        <Select setValue={handleChangBirthday('month')} valueDefault={birthday.month} data={months}>
                            Month
                        </Select>
                        <Select setValue={handleChangBirthday('day')} valueDefault={birthday.day} data={days}>
                            Day
                        </Select>
                        <Select setValue={handleChangBirthday('year')} valueDefault={birthday.year} data={years}>
                            Years
                        </Select>
                    </div>
                </div>
                <p className='text-xs text-gray-600'>You need to enter your date of birth</p>
                <p className='text-xs text-gray-600 py-4'>
                    Add your own birthday, whether this is for a business account, a pet account, or anything else
                    something else
                </p>
                <Button disable={btnDisable} onClick={handleNextOtp} className='w-full'>
                    Next
                </Button>
                <Button onClick={handleStep('prev')} className='mb-2 mx-auto' type='text'>
                    Back
                </Button>
            </div>
        </div>
    )
}

export default Birthday
