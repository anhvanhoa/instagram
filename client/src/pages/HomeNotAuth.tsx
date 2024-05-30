import classNames from 'classnames'
import images from '~/assets'
import Login from './auth/Login'
import { useState, useEffect } from 'react'
import Register from './auth/Register'
const listImage: string[] = [
    images.screenshot1,
    images.screenshot2,
    images.screenshot3,
    images.screenshot4,
]
const HomeNotAuth = () => {
    const [isActive, setActive] = useState(0)
    // true -> register | false -> login
    const [loginOrRegister] = useState(() =>
        Boolean(sessionStorage.getItem('loginOrRegister')),
    )
    useEffect(() => {
        const timerId = setInterval(() => {
            setActive((prev) => (prev === listImage.length - 1 ? 0 : prev + 1))
        }, 5000)
        return () => clearTimeout(timerId)
    }, [])
    return (
        <main className='dark:bg-white'>
            <section className='flex justify-center items-center'>
                <div className='relative mt-4 hidden lg:block'>
                    <div>
                        <div
                            className={classNames(
                                'absolute w-[260px] h-[564px] object-cover',
                                'top-6 bg-white z-10 rounded-[28px] left-[154px]',
                            )}
                        >
                            {listImage.map((element, index) => (
                                <img
                                    className={classNames(
                                        'absolute transition-all duration-[2000ms]',
                                        {
                                            'z-10 opacity-100': isActive === index,
                                            'opacity-5': isActive !== index,
                                        },
                                    )}
                                    key={index}
                                    src={element}
                                    alt={element}
                                />
                            ))}
                        </div>
                    </div>
                    <div
                        className={
                            'bg-cover h-[630px] w-[450px] bg-no-repeat relative z-10'
                        }
                        style={{ backgroundImage: `url(${images.homePhone})` }}
                    ></div>
                </div>
                <div>{loginOrRegister ? <Register /> : <Login />}</div>
            </section>
        </main>
    )
}

export default HomeNotAuth
