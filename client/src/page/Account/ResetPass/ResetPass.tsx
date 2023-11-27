/* eslint-disable react-hooks/exhaustive-deps */
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import httpCheckReset from '~/apis/httpCheckReset';
import httpResetPass from '~/apis/httpResetPass';
import NotFound from '~/page/NotFound';
import Button from '~/components/Button';

interface DataJwt extends JwtPayload {
    _id: string;
    useName: string;
    exp: number;
}

const ResetPass = () => {
    const [notify, setNotify] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(true);
    const [validPass, setValidPass] = useState<boolean>(false);
    const [validConfirmPass, setValidConfirmPass] = useState<boolean>(false);
    const [newPass, setNewPass] = useState<string>('');
    const [confirmNewPass, setConfirmNewPass] = useState<string>('');
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
    const handleValidPass = (value: string) => {
        if (value.length === 0) {
            setValidPass(false);
        } else if (value.length < 6) {
            setValidPass(true);
        } else {
            setValidPass(false);
        }
    };
    const handleValidConfirm = (value: string) => {
        if (value.length === 0) {
            setValidConfirmPass(false);
        } else if (newPass !== value) {
            setValidConfirmPass(true);
        } else {
            setValidConfirmPass(false);
            setDisable(false);
        }
    };
    const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPass(event.target.value);
        handleValidPass(event.target.value);
        handleValidConfirm('');
    };
    const handleChangeConfirmPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmNewPass(event.target.value);
        handleValidConfirm(event.target.value);
    };
    const apiCheckReset = async (id: string, token: string) => {
        try {
            await httpCheckReset({ id, token });
        } catch (error) {
            setError(true);
        }
    };
    useEffect(() => {
        if (token) {
            try {
                const dataJwt: DataJwt = jwtDecode(token);
                apiCheckReset(dataJwt._id, token);
            } catch (error) {
                setError(true);
            }
        }
    }, []);
    const apiResetPass = async () => {
        if (!token) return;
        try {
            await httpResetPass({ password: confirmNewPass }, token);
            window.location.href = '/';
        } catch (error) {
            setNotify('Không thể đặt lại mật khẩu');
            setTimeout(() => {
                setNotify('');
            }, 2000);
        }
    };
    const handleResetPass = () => {
        apiResetPass();
    };
    return (
        <>
            {error ? (
                <NotFound />
            ) : (
                <div>
                    {notify && (
                        <div className="fixed bottom-0 w-screen">
                            <div className="bg-zinc-800 py-3">
                                <p className="text-white pl-2">{notify}</p>
                            </div>
                        </div>
                    )}
                    <div className="max-w-[360px] mx-auto border-[#ccc]/50 border-solid border text-center py-14 px-12 mt-16">
                        <div>
                            <h3 className="font-bold">Tạo mật khẩu mạnh</h3>
                            <p className="text-sm text-second py-3">
                                Mật khẩu của bạn phải có tối thiểu 6 ký tự, đồng thời bao gồm cả chữ số, chữ cái và ký
                                tự đặc biệt (!$@%).
                            </p>
                            <div className="mt-4">
                                <div className="pt-6 relative">
                                    {validPass && (
                                        <p className="text-left text-xs text-second absolute left-0 top-2">
                                            Mật khẩu phải có ít nhất 6 ký tự.
                                        </p>
                                    )}
                                    <input
                                        onChange={handleChangePass}
                                        value={newPass}
                                        className="w-full pl-2 py-3 text-sm placeholder:text-xs placeholder:text-gray-600 bg-[#fafafa] border-[#ccc]/50 border-solid border rounded-md"
                                        type="password"
                                        placeholder="Mật khẩu mới"
                                    />
                                </div>
                                <div className="pt-6 relative">
                                    {validConfirmPass && (
                                        <p className="text-left text-xs text-second absolute left-0 top-2">
                                            Mật khẩu không khớp.
                                        </p>
                                    )}
                                    <input
                                        onChange={handleChangeConfirmPass}
                                        value={confirmNewPass}
                                        className="w-full pl-2 py-3 text-sm placeholder:text-xs placeholder:text-gray-600 bg-[#fafafa] border-[#ccc]/50 border-solid border rounded-md"
                                        type="password"
                                        placeholder="Nhập lại mật khẩu mới"
                                    />
                                </div>
                            </div>
                            <Button disable={disable} onClick={handleResetPass} className="w-full mt-6 py-3">
                                Đặt lại mật khẩu
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ResetPass;
