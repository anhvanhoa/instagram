import { useSelector, useDispatch } from 'react-redux';
import Button from '~/components/Button';
import OtherLogin from '~/components/OtherLogin';
import InputAuth from '../InputAuth/InputAuth';
import { AuthLogin } from '~/types/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpLogin from '~/apis/httpLogin';
import { Icon } from '@iconify/react';
import { RootType } from '~/store';
import { failLogin, startLogin, successLogin } from '~/store/auth.slice';

const FormLogin = () => {
    const navigate = useNavigate();
    const [typeInput, setTypeInput] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [formLogin, setFormLogin] = useState<AuthLogin>({
        emailOrPhone: '',
        password: '',
    });
    const dispatch = useDispatch();
    const auth = useSelector((state: RootType) => state.auth);
    const handleTypeInput = () => setTypeInput((prev) => (prev ? false : true));
    const handleValid = () => {
        if (
            formLogin.emailOrPhone !== '' &&
            formLogin.password !== '' &&
            formLogin.emailOrPhone.length > 3 &&
            formLogin.password.length > 4
        ) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    };
    const handleUserOrMail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormLogin((prev) => ({
            ...prev,
            emailOrPhone: event.target.value,
        }));
        setError(true);
        handleValid();
    };
    const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormLogin((prev) => ({
            ...prev,
            password: event.target.value,
        }));
        handleValid();
        setError(true);
    };
    const loginApi = (data: AuthLogin) => {
        dispatch(startLogin());
        setDisable(true);
        httpLogin(data)
            .then((res) => {
                dispatch(successLogin(res));
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                dispatch(failLogin());
                setDisable(true);
                setError(true);
            });
    };
    const handleLogin = async (event: React.MouseEvent<Element, MouseEvent>) => {
        event.preventDefault();
        loginApi(formLogin);
    };
    return (
        <div>
            <form action="">
                <div className="pt-6 flex flex-col">
                    <InputAuth onChange={handleUserOrMail} value={formLogin.emailOrPhone} type="text">
                        Tên đăng nhập, số điện thoại hoặc email
                    </InputAuth>
                    <div className="relative">
                        <InputAuth
                            onChange={handleChangePass}
                            value={formLogin.password}
                            type={typeInput ? 'text' : 'password'}
                        >
                            Mật khẩu
                        </InputAuth>
                        <div className="absolute right-12 top-0 flex items-center h-full pb-2">
                            <p
                                onClick={handleTypeInput}
                                className="text-xs cursor-pointer hover:text-primary select-none"
                            >
                                {typeInput ? 'Ẩn' : 'Hiển thị'}
                            </p>
                        </div>
                    </div>
                    <Button disable={disable} onClick={handleLogin} className="mx-10 my-2">
                        {auth.isLoading ? (
                            <Icon className="animate-spin text-lg" icon="mingcute:loading-line" />
                        ) : (
                            'Đăng Nhập'
                        )}
                    </Button>
                    <OtherLogin error={auth.error && error} />
                </div>
            </form>
        </div>
    );
};

export default FormLogin;
