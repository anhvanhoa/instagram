import WrapperAuth from '~/components/WrapperAuth'
import { useState } from 'react'
import FormRegister from '~/components/Register'
import Birthday from '~/components/Birthday'
import Otp from '~/components/Otp'
import { DataRegister, BirthdayType } from '~/types/auth'
import { MutateOptions, useMutation } from '@tanstack/react-query'
import sendOtp, { SendOTP } from '~/apis/sendOtp'
import isEmail from 'validator/lib/isEmail'
import firebaseOtp from '~/apis/firebaseOtp'
import registerFacebook from '~/apis/registerFacebook'
import useAuth from '~/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

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
    const { setUser } = useAuth()
    const navigation = useNavigate()
    const [dataForm, setDataFrom] = useState<DataRegister>(initDataForm)
    const [step, setStep] = useState(1)
    const [verificationId, setVerificationId] = useState('')
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
    const otpFirebase = firebaseOtp()
    const handleSendOtp = async (type: string = '') => {
        const handle: MutateOptions<number, Error, SendOTP> = {
            onSuccess: () => {
                type === 'next' && handleStep('next')()
            },
        }
        if (isEmail(dataForm.email)) mutate({ email: dataForm.email }, handle)
        else {
            otpFirebase.sendOtpFirebase(dataForm.email, 'verify').then((data) => {
                setVerificationId(data)
                type === 'next' && handleStep('next')()
            })
        }
    }
    const handleLoginFB = async () => {
        try {
            const user = await registerFacebook()
            setUser(user)
            navigation('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <main>
            <WrapperAuth isLogo={step !== 1} isAccount>
                {step === 1 && (
                    <FormRegister
                        handleLoginFB={handleLoginFB}
                        handleStep={handleStep}
                        dataForm={dataForm}
                        setDataFrom={setDataFrom}
                    />
                )}
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
                        verificationId={verificationId}
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
