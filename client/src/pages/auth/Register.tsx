import WrapperAuth from '~/components/WrapperAuth'
import { useState } from 'react'
import FormRegister from '~/components/Register'
import Birthday from '~/components/Birthday'
import Otp from '~/components/Otp'
import { DataRegister, BirthdayType } from '~/types/register'
import { MutateOptions, useMutation } from '@tanstack/react-query'
import sendOtp, { SendOTP } from '~/apis/sendOtp'
import isEmail from 'validator/lib/isEmail'

const initDataForm: DataRegister = {
    email: '',
    numberPhone: '',
    fullName: '',
    userName: '',
    password: '',
    birthday: '',
    otp: '',
}

const initBirthday: BirthdayType = {
    day: 10,
    month: 12,
    year: 2000,
}
const Register = () => {
    const [dataForm, setDataFrom] = useState<DataRegister>(initDataForm)
    const [step, setStep] = useState(1)
    const [birthday, setBirthday] = useState<BirthdayType>(initBirthday)
    // Handle step
    const handleStep = (name: 'next' | 'prev') => () => {
        if (name == 'next') setStep((prev) => prev + 1)
        if (name == 'prev') setStep((prev) => prev - 1)
    }
    // TanStack
    const { mutate } = useMutation({
        mutationFn: (body: SendOTP) => sendOtp(body),
    })
    // handle send otp
    const handleSendOtp = async (type: string = '') => {
        const handle: MutateOptions<number, Error, SendOTP> = {
            onSuccess: () => {
                type === 'next' && handleStep('next')()
            },
        }
        if (isEmail(dataForm.email)) mutate({ email: dataForm.email }, handle)
        else mutate({ numberPhone: dataForm.email }, handle)
    }
    return (
        <main>
            <WrapperAuth isLogo={step !== 1} isAccount>
                {step === 1 && <FormRegister handleStep={handleStep} dataForm={dataForm} setDataFrom={setDataFrom} />}
                {step === 2 && (
                    <Birthday
                        sendOtp={handleSendOtp}
                        dataForm={dataForm}
                        handleStep={handleStep}
                        birthday={birthday}
                        setBirthday={setBirthday}
                    />
                )}
                {step == 3 && (
                    <Otp
                        sendOtp={handleSendOtp}
                        dataForm={dataForm}
                        setDataFrom={setDataFrom}
                        handleStep={handleStep}
                    />
                )}
            </WrapperAuth>
        </main>
    )
}

export default Register
