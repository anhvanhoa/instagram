/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import birthday from '~/utils/birthday';
import { ResData, Signup } from '~/types/auth';
import images from '~/assets/images';
import Button from '~/components/Button';
import Select from './Select';
import OverLay from '~/components/OverLay';
import httpOtp from '~/apis/httpOtp';

interface Props {
    prevStep: () => void;
    nextStep: () => void;
    setDataSignup: (value: React.SetStateAction<Signup>) => void;
    dataSignup: Signup;
}

const Birthday = ({ prevStep, nextStep, setDataSignup, dataSignup }: Props) => {
    const [error, setError] = useState<boolean>(false);
    const [contentError, setContentError] = useState<string>('Không thể tạo tài khoản');
    const [month, setMonth] = useState<number>(10);
    const [year, setYear] = useState<number>(2020);
    const [day, setDay] = useState<number>(17);
    const [disable, setDisable] = useState<boolean>(true);
    const [listDay, setListDay] = useState<number[]>(() => birthday.generateDay(month, year));
    const [listYears] = useState<number[]>(() => birthday.generateYears());
    const [listMonth] = useState<number[]>(() => birthday.generateMonth());
    const handleError = () => setError(false);
    useEffect(() => {
        setListDay(birthday.generateDay(month, year));
    }, [year, month]);
    const handleChangeYear = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(Number(event.target.value));
        const isEightTeen = birthday.checkAge(day, month, Number(event.target.value));
        isEightTeen ? setDisable(false) : setDisable(true);
    }, []);
    const handleChangeMonth = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setMonth(Number(event.target.value));
        const isEightTeen = birthday.checkAge(day, Number(event.target.value), year);
        isEightTeen ? setDisable(false) : setDisable(true);
    }, []);
    const handleChangeDate = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setDay(Number(event.target.value));
        const isEightTeen = birthday.checkAge(Number(event.target.value), month, year);
        isEightTeen ? setDisable(false) : setDisable(true);
    }, []);
    const apiSendOtp = async (emailOrPhone: string) => {
        try {
            const res: ResData = await httpOtp({ emailOrPhone });
            if (res.status > 200) {
                setContentError(res.message);
                setError(true);
            } else {
                nextStep();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleSignup = () => {
        const birthday = `${year}/${month}/${day}`;
        setDataSignup((prev) => ({
            ...prev,
            birthday,
        }));
        apiSendOtp(dataSignup.emailOrPhone);
    };
    return (
        <div className="px-7 py-2 max-w-[350px] mx-auto">
            <div>
                <div>
                    {error ? (
                        <OverLay onClose={handleError}>
                            <div className="w-[400px] flex flex-col justify-center bg-white rounded-3xl">
                                <p className="text-xl py-7 text-center">{contentError}</p>
                                <Button
                                    onClick={handleError}
                                    className="text-black border-t border-[#ccc]/50 border-solid py-4"
                                    text
                                >
                                    Ok
                                </Button>
                            </div>
                        </OverLay>
                    ) : null}
                </div>
                <div className="flex flex-col items-center text-center gap-1 text-sm leading-4">
                    <div className="w-36 h-24 mt-3" style={{ background: `url(${images.synthetic})` }}></div>
                    <p className="font-medium py-2">Thêm ngày sinh</p>
                    <p className="">Thông tin này sẽ không hiển thị trên trang cá nhân công khai của bạn.</p>
                    <Link to="/" className="text-primary">
                        Tại sao tôi cần cung cấp ngày sinh của mình?
                    </Link>
                    <div className="flex items-center gap-4 my-3">
                        <Select setValue={handleChangeMonth} valueDefault={month} data={listMonth}>
                            Tháng
                        </Select>
                        <Select setValue={handleChangeDate} valueDefault={day} data={listDay}>
                            Ngày
                        </Select>
                        <Select setValue={handleChangeYear} valueDefault={year} data={listYears}>
                            Năm
                        </Select>
                    </div>
                    <p className="text-xs text-second">Bạn cần nhập ngày sinh của mình</p>
                    <p className="text-xs text-second py-4">
                        Hãy thêm ngày sinh của chính bạn, dù đây là tài khoản dành cho doanh nghiệp, thú cưng hay bất cứ
                        điều gì khác
                    </p>
                    <Button onClick={handleSignup} className="w-full" disable={disable}>
                        Tiếp
                    </Button>
                    <Button onClick={prevStep} text className="mb-2">
                        Quay lại
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Birthday;
