import images from '~/assets/images';
import InputAuth from '~/components/InputAuth';
import Button from '~/components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpForgotPass from '~/apis/httpForgotPass';

const ForgotPass = () => {
    const [notify, setNotify] = useState<string>('');
    const [emailOrPhoneOrUsername, setEmailOrPhoneOrUsername] = useState<string>('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailOrPhoneOrUsername(event.target.value);
    };
    const navigate = useNavigate();
    const handleBackLogin = () => {
        navigate(-1);
    };
    const handleForgotPass = () => {
        const apiForgotPass = async () => {
            try {
                await httpForgotPass({ emailOrPhone: emailOrPhoneOrUsername });
                setNotify('Vui lòng check email !');
                setTimeout(() => {
                    setNotify('');
                    navigate('/');
                }, 2000);
            } catch (error) {
                setNotify('Không tìm thấy người dùng');
                setTimeout(() => {
                    setNotify('');
                }, 2000);
            }
        };
        apiForgotPass();
    };
    return (
        <div>
            {notify && (
                <div className="fixed bottom-0 w-screen">
                    <div className="bg-zinc-800 py-3">
                        <p className="text-white pl-2">{notify}</p>
                    </div>
                </div>
            )}
            <div>
                <div className="max-w-sm border border-[#ccc]/50 border-solid mx-auto my-10 text-center">
                    <div
                        className="w-24 h-24 mt-5 bg-[-342px_0px] mx-auto"
                        style={{ backgroundImage: `url(${images.synthetic})` }}
                    ></div>
                    <p className="font-medium py-2">Bạn gặp sự cố khi đăng nhập?</p>
                    <p className="text-sm pb-4 pt-3 px-9">
                        Nhập email, số điện thoại hoặc tên người dùng của bạn và chúng tôi sẽ gửi cho bạn một liên kết
                        để truy cập lại vào tài khoản.
                    </p>
                    <InputAuth value={emailOrPhoneOrUsername} onChange={handleChange} type="text">
                        Email, điện thoại hoặc tên người dùng
                    </InputAuth>
                    <div className="mx-10 mb-2 mt-3">
                        <Button className="w-full" disable={!emailOrPhoneOrUsername} onClick={handleForgotPass}>
                            Gửi liên kết đăng nhập
                        </Button>
                    </div>
                    <p className="cursor-pointer text-xs pt-2">Bạn không thể đặt lại mật khẩu?</p>
                    <div className="flex items-center mx-10 mt-7">
                        <div className="h-[1px] bg-[#ccc] flex-1"></div>
                        <p className="mx-4 uppercase text-xs font-medium text-second">hoặc</p>
                        <div className="h-[1px] bg-[#ccc] flex-1"></div>
                    </div>
                    <Button className="w-full text-black mt-1" to="/account/signup" text>
                        Tạo tài khoản mới
                    </Button>
                    <Button
                        className="w-full text-black bg-[#ccc]/30 hover:bg-[#ccc]/30 rounded-none py-3 mt-16"
                        onClick={handleBackLogin}
                        text
                    >
                        Quay lại đăng nhập
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;
