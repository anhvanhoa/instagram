import images from '~/assets/images';
import InputAuth from '~/components/InputAuth';
import Button from '~/components/Button';
import { useState } from 'react';
import httpOtp from '~/apis/httpOtp';
import httpSignup from '~/apis/httpSignup';
import { Signup } from '~/types/auth';

interface Props {
    prevStep: () => void;
    setDataSignup: (value: React.SetStateAction<Signup>) => void;
    dataSignup: Signup;
}

const Otp = ({ prevStep, setDataSignup, dataSignup }: Props) => {
    const [otp, setOtp] = useState<string>('');
    const [disable, setDisable] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setOtp(event.target.value);
    const apiSendEmail = async () => {
        await httpOtp({ emailOrPhone: dataSignup.emailOrPhone });
        setDisable(true);
        setTimeout(() => {
            setDisable(false);
        }, 60000);
    };
    const aipSignup = async (user: Signup) => {
        try {
            await httpSignup(user);
            window.location.href = '/account/login';
        } catch (error) {
            setError(true);
        }
    };
    const handleSignup = () => {
        const userOtp: Signup = {
            ...dataSignup,
            codeVerify: otp,
        };
        aipSignup(userOtp);
    };
    return (
        <div className="flex flex-col">
            <div className="max-w-[350px] mx-auto flex flex-col items-center">
                <div
                    className="h-[76px] w-24 mt-3 bg-[-439px_1px]"
                    style={{ backgroundImage: `url(${images.synthetic})` }}
                ></div>
                <p className="font-medium py-2">Chỉ một bước nữa thôi</p>
                <p className="text-sm pb-4 pt-3 text-center px-9">
                    Nhập mã xác nhận mà chúng tôi đã gửi đến địa chỉ
                    <span className="text-primary">{dataSignup.emailOrPhone}</span>
                </p>
            </div>
            <InputAuth value={otp} onChange={handleChange} type="number">
                ######
            </InputAuth>
            <Button onClick={handleSignup} className="mt-7 mx-9">
                Xác nhận
            </Button>
            {error && (
                <p className="text-red-500 text-center px-9 pt-6 text-sm">
                    Mã không hợp lệ. Bạn có thể yêu cầu mã mới.
                </p>
            )}
            <div className="flex items-center justify-center py-6">
                <Button onClick={prevStep} text className="px-0">
                    Đổi mail
                </Button>
                |
                <Button disable={disable} onClick={apiSendEmail} className="px-0" text>
                    Yêu cầu mã mới
                </Button>
            </div>
        </div>
    );
};

export default Otp;
