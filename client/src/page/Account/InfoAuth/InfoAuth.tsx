import { useEffect, useState } from 'react';
import images from '~/assets/images';
import classNames from 'classnames';
import Login from '~/page/Account/Login';
import Signup from '~/page/Account/Signup';

const InfoAuth = () => {
    const listImage: string[] = [images.screenshot1, images.screenshot2, images.screenshot3, images.screenshot4];
    const [index1, setIndex] = useState<number>(0);
    const [isAccount, setIsAccount] = useState<boolean>(() => !Boolean(sessionStorage.getItem('is_account')));
    const handleSwitch = () => {
        setIsAccount((prev) => {
            if (prev) {
                sessionStorage.setItem('is_account', 'true');
                return false;
            }
            sessionStorage.removeItem('is_account');
            return true;
        });
    };
    useEffect(() => {
        let timerId = setInterval(() => {
            setIndex((prev) => (prev === listImage.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => {
            clearTimeout(timerId);
        };
    }, [listImage.length]);
    return (
        <div className="flex justify-center mt-8">
            <div className="relative">
                <div>
                    {listImage.map((element, index) => (
                        <img
                            key={index}
                            src={element}
                            alt=""
                            className={classNames('absolute w-[250px] h-[538px] object-cover left-[155px] top-7', {
                                'z-50 animate-pulseInfo': index === index1,
                                'z-20 animate-pulseInfoPrev': index === index1 - 1,
                            })}
                        />
                    ))}
                    <div
                        className={classNames(
                            'absolute w-[250px] h-[545px] object-cover left-[155px] top-6 bg-black z-10 rounded-3xl',
                        )}
                    ></div>
                </div>
                <div
                    className={'bg-cover h-[634px] w-[486px] bg-no-repeat'}
                    style={{ background: `url(${images.home_phones})` }}
                ></div>
            </div>
            {isAccount ? <Login setIsAccount={handleSwitch} /> : <Signup setIsAccount={handleSwitch} />}
        </div>
    );
};

export default InfoAuth;
