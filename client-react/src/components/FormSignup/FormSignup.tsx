import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '~/components/Button';
import InputAuth from '~/components/InputAuth';
import { ResData, Signup } from '~/types/auth';
import { Valid } from '~/types';
import httpUniqueUsername from '~/apis/httpUniqueUsername';
import httpUniqueEmailOrPhone from '~/apis/httpUniqueEmailOrPhone';

interface Props {
    nextStep: () => void;
    setDataSignup: (value: React.SetStateAction<Signup>) => void;
    dataSignup: Signup;
}

const FormSignup = ({ nextStep, setDataSignup, dataSignup }: Props) => {
    const valid: Valid = {
        iconError: false,
        iconSuccess: false,
    };
    const [typeInput, setTypeInput] = useState<boolean>(false);
    const [emailOrPhone, setEmailOrPhone] = useState<string>(dataSignup.emailOrPhone);
    const [fullName, setFullName] = useState<string>(dataSignup.fullName);
    const [userName, setUserName] = useState<string>(dataSignup.userName);
    const [password, setPassword] = useState<string>('');
    const [disable, setDisable] = useState<boolean>(true);
    const [validMailOrPhone, setValidMailOrPhone] = useState<Valid>(valid);
    const [validUsername, setUsername] = useState<Valid>(valid);
    const handleTypeInput = () => setTypeInput((prev) => (prev ? false : true));
    const handleChangeEmailOrPhone = (event: React.ChangeEvent<HTMLInputElement>) =>
        setEmailOrPhone(event.target.value);
    const handleChangeFullName = (event: React.ChangeEvent<HTMLInputElement>) => setFullName(event.target.value);
    const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value);
    const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
    const checkNumberPhoneOrMail = (value: string): boolean => {
        const numberPhoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        const checkNumberPhone = numberPhoneRegex.test(value);
        const regexMail: RegExp = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const checkMail: boolean = regexMail.test(value);
        return checkNumberPhone || checkMail ? true : false;
    };
    const checkEmpty = (value: string): boolean => (value ? true : false);
    const checkSpace = (value: string): boolean => value.includes(' ');
    const checkLength = (value: string): boolean => value.length > 5;
    const handleDisable = () => {
        const emailOrPhoneEmpty = checkEmpty(emailOrPhone);
        const fullNameEmpty = checkEmpty(fullName);
        const userNameEmpty = checkEmpty(userName);
        const passwordEmpty = checkEmpty(password);
        const isNumberPhoneOrMail = checkNumberPhoneOrMail(emailOrPhone);
        const isSpace = !checkSpace(userName);
        const isLength = checkLength(password);
        const isDisable =
            emailOrPhoneEmpty &&
            fullNameEmpty &&
            userNameEmpty &&
            passwordEmpty &&
            isNumberPhoneOrMail &&
            isSpace &&
            isLength;
        isDisable ? setDisable(false) : setDisable(true);
    };
    const apiUniqueUsername = async (userName: string) => {
        try {
            const res: ResData = await httpUniqueUsername({ userName });
            if (res.status > 200) {
                setUsername({
                    iconError: true,
                    iconSuccess: false,
                });
            } else {
                setUsername({
                    iconError: false,
                    iconSuccess: true,
                });
            }
            return res;
        } catch (error) {
            setUsername({
                iconError: true,
                iconSuccess: false,
            });
        }
    };
    const apiUniqueEmailOrPhone = async (emailOrPhone: string) => {
        try {
            const res: ResData = await httpUniqueEmailOrPhone({ emailOrPhone });
            if (res.status > 200) {
                setValidMailOrPhone({
                    iconError: true,
                    iconSuccess: false,
                });
            } else {
                setValidMailOrPhone({
                    iconError: false,
                    iconSuccess: true,
                });
            }
        } catch (error) {
            setValidMailOrPhone({
                iconError: true,
                iconSuccess: false,
            });
        }
    };
    const handleValidMailOrPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value;
        const isNumberPhoneOrMail = checkNumberPhoneOrMail(value);
        const valueEmpty = checkEmpty(value);
        if (!valueEmpty) {
            setValidMailOrPhone(valid);
        } else if (!isNumberPhoneOrMail) {
            setValidMailOrPhone({
                iconError: true,
                iconSuccess: false,
            });
        } else {
            apiUniqueEmailOrPhone(value);
        }
    };
    const handleValidUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const isSpace = checkSpace(value);
        const valueEmpty = checkEmpty(value);
        if (!valueEmpty) {
            setUsername(valid);
        } else if (isSpace) {
            setUsername({
                iconError: true,
                iconSuccess: false,
            });
        } else {
            apiUniqueUsername(value);
        }
    };

    useEffect(() => {
        handleDisable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailOrPhone, password, fullName, userName]);

    const handleSignup = (event: React.MouseEvent<Element, MouseEvent>) => {
        event.preventDefault();
        const user = {
            emailOrPhone,
            fullName,
            userName,
            password,
        };
        setDataSignup((prev) => ({
            ...prev,
            ...user,
        }));
        nextStep();
    };
    return (
        <div>
            <div id="recaptcha"></div>
            <div>
                <p className="mx-10 text-center pb-3 font-semibold text-second">
                    Đăng ký để xem ảnh và video từ bạn bè.
                </p>
            </div>
            <div className="mx-10 my-2">
                <Button className="w-full" leftIcon={<Icon icon="uiw:facebook" />}>
                    Đăng nhập bằng Facebook
                </Button>
            </div>
            <div className="flex items-center mx-10 my-3">
                <div className="h-[1px] bg-[#ccc] flex-1"></div>
                <p className="mx-4 uppercase text-xs font-medium text-second">hoặc</p>
                <div className="h-[1px] bg-[#ccc] flex-1"></div>
            </div>
            <div>
                <div className="relative">
                    <InputAuth
                        onBlur={handleValidMailOrPhone}
                        onChange={handleChangeEmailOrPhone}
                        value={emailOrPhone}
                        type="text"
                    >
                        Số di động hoặc email
                    </InputAuth>
                    <div className="absolute right-12 top-0 flex items-center h-full">
                        {validMailOrPhone.iconSuccess && (
                            <Icon className="text-green-600" icon="icon-park-outline:check-one" />
                        )}
                        {validMailOrPhone.iconError && <Icon className="text-red-500" icon="carbon:close-outline" />}
                    </div>
                </div>
                <InputAuth onChange={handleChangeFullName} value={fullName} type="text">
                    Tên đầy đủ
                </InputAuth>
                <div className="relative">
                    <InputAuth
                        onBlur={handleValidUsername}
                        onChange={handleChangeUserName}
                        value={userName}
                        type="text"
                    >
                        Tên người dùng
                    </InputAuth>
                    <div className="absolute right-12 top-0 flex items-center h-full">
                        {validUsername.iconSuccess && (
                            <Icon className="text-green-600" icon="icon-park-outline:check-one" />
                        )}
                        {validUsername.iconError && <Icon className="text-red-500" icon="carbon:close-outline" />}
                    </div>
                </div>
                <div className="relative">
                    <InputAuth onChange={handleChangePass} value={password} type={typeInput ? 'text' : 'password'}>
                        Mật khẩu
                    </InputAuth>
                    <div className="absolute right-12 top-0 flex items-center h-full">
                        <p onClick={handleTypeInput} className="text-xs cursor-pointer hover:text-primary select-none">
                            {typeInput ? 'Ẩn' : 'Hiển thị'}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mx-10 text-center text-xs mb-4">
                <p className="text-second">
                    Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Instagram.
                </p>
                <Link to="/tim-hieu-them">Tìm hiểu thêm</Link>
            </div>
            <div className="mx-10 text-center text-xs mb-4">
                <p className="text-second">
                    Bằng cách đăng ký, bạn đồng ý với{' '}
                    <Link className="text-[#000]" to="/chinh-sach">
                        Điều khoản, Chính sách quyền riêng tư
                    </Link>{' '}
                    và{' '}
                    <Link className="text-[#000]" to="/chinh-sach">
                        Chính sách cookie
                    </Link>{' '}
                    của chúng tôi.
                </p>
            </div>
            <div className="mx-10 my-2">
                <Button onClick={handleSignup} className="w-full" disable={disable}>
                    Đăng ký
                </Button>
            </div>
            <div className="mb-10"></div>
        </div>
    );
};

export default FormSignup;
