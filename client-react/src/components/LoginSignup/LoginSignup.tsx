import React, { memo, useState } from 'react';
import { Link, To } from 'react-router-dom';

interface Props {
    isAccount: boolean;
    setIsAccount?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
interface PropsType {
    question: string;
    to: To;
    title: string;
}

const LoginSignup: React.FC<Props> = ({ isAccount, setIsAccount }) => {
    const [account] = useState<PropsType>(() => {
        const signup: PropsType = {
            question: 'Bạn chưa có tài khoản ư?',
            to: '/account/signup',
            title: 'Đăng ký',
        };
        const login: PropsType = {
            question: 'Bạn có tài khoản?',
            to: '/account/login',
            title: 'Đăng nhập',
        };
        return isAccount ? signup : login;
    });

    return (
        <div className="border border-[#d2d2d2] border-solid w-full p-5 mt-2">
            <div className="flex items-center justify-center text-sm gap-1">
                <p>{account.question}</p>
                <Link onClick={setIsAccount} to={account.to} className="text-primary font-semibold">
                    {account.title}
                </Link>
            </div>
        </div>
    );
};

export default memo(LoginSignup);
