import Button from '~/components/Button'
import InputAuth from '~/components/InputAuth'
import images from '~/assets'
import { DataRegister } from '~/types/register'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import register from '~/apis/register'
import { useNavigate } from 'react-router-dom'
import { pathPublic } from '~/config/routes'
import isEmail from 'validator/lib/isEmail'
import firebaseOtp from '~/apis/firebaseOtp'
import firebaseRegister from '~/apis/firebaseRegister'

interface Props {
    verificationId: string
    dataForm: DataRegister
    setDataFrom: (value: React.SetStateAction<DataRegister>) => void
    sendOtp: () => void
    handleStep: (type: 'next' | 'prev') => () => void // currying
}
// const timerCallApi = 5 * 60 * 1000
const Otp: React.FC<Props> = ({ dataForm, handleStep, setDataFrom, sendOtp, verificationId }) => {
    const [btnDisable, setBtnDisable] = useState(true)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    // handle disable send otp 300s
    useEffect(() => {
        const timerId = setTimeout(() => setBtnDisable(false), 5000)
        return () => clearTimeout(timerId)
    }, [btnDisable])
    // tanStack
    const { mutate, isError } = useMutation({
        mutationFn: (body: DataRegister) => register(body),
    })
    // Handle success
    const handleSuccess = () => navigate(pathPublic.login)
    // handle verify
    const otpFirebase = firebaseOtp()
    // handle register
    const handleRegister = () => {
        setBtnDisable(true)
        if (!isEmail(dataForm.email)) {
            dataForm.numberPhone = dataForm.email
            dataForm.email = ''
            otpFirebase
                .verifyOtp(dataForm.otp, verificationId)
                .then(() => firebaseRegister(dataForm).then(handleSuccess))
                .catch(() => setError(true))
        } else {
            mutate(dataForm, {
                onSuccess: handleSuccess,
            })
        }
    }
    return (
        <div>
            <div className='flex flex-col'>
                <div id='verify'></div>
                <div className='max-w-[350px] mx-auto flex flex-col items-center'>
                    <div
                        className='h-[76px] w-24 mt-3 bg-[-439px_1px]'
                        style={{ backgroundImage: `url(${images.synthetic})` }}
                    ></div>
                    <p className='font-medium py-2'>Chỉ một bước nữa thôi</p>
                    <p className='text-sm pb-4 pt-3 text-center px-9'>
                        Nhập mã xác nhận mà chúng tôi đã gửi đến địa chỉ
                        <span className='text-primary'>{}</span>
                    </p>
                </div>
                <InputAuth
                    onChange={(event) => setDataFrom((prev) => ({ ...prev, otp: event.target.value }))}
                    value={dataForm.otp}
                    type='text'
                    maxLength={6}
                >
                    ######
                </InputAuth>
                <Button onClick={handleRegister} className='mt-4 mx-auto'>
                    Xác nhận
                </Button>
                {(isError || error) && (
                    <p className='text-red-500 text-center px-9 pt-6 text-sm'>
                        Mã không hợp lệ. Bạn có thể yêu cầu mã mới.
                    </p>
                )}
                <div className='flex items-center justify-center py-6'>
                    <Button onClick={handleStep('prev')} type='text' className='px-0'>
                        Quay lại
                    </Button>
                    |
                    <Button onClick={sendOtp} type='text' disable={btnDisable} className='px-0'>
                        Yêu cầu mã mới
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Otp
