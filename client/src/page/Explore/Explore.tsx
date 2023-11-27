import { Icon } from '@iconify/react';
import ClipIcon from '~/components/Icon/ClipIcon';
import cln from 'classnames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Explore = () => {
    const dispatch = useDispatch();
    dispatch({ type: 'auth/checkToken' });
    const data = [
        [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1568571959361-3bffbad07499?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1595475349262-88ba1e1eecaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            },
        ],
        [
            {
                id: 4,
                image: 'https://images.unsplash.com/photo-1568571959361-3bffbad07499?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            },
            {
                id: 5,
                image: 'https://images.unsplash.com/photo-1595475349262-88ba1e1eecaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            },
            {
                id: 6,
                image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            },
        ],
        [
            {
                id: 7,
                image: 'https://images.unsplash.com/photo-1568571959361-3bffbad07499?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            },
            {
                id: 8,
                image: 'https://images.unsplash.com/photo-1595475349262-88ba1e1eecaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            },
            {
                id: 9,
                image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            },
        ],
        [
            {
                id: 10,
                image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1121&q=80',
            },
            {
                id: 11,
                image: 'https://images.unsplash.com/photo-1502301197179-65228ab57f78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80',
            },
            {
                id: 12,
                image: 'https://images.unsplash.com/photo-1531938716357-224c16b5ace3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
            },
            {
                id: 13,
                image: 'https://images.unsplash.com/photo-1568571959361-3bffbad07499?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            },
            {
                id: 14,
                image: 'https://images.unsplash.com/photo-1595475349262-88ba1e1eecaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            },
        ],
        [
            {
                id: 15,
                image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1121&q=80',
            },
            {
                id: 16,
                image: 'https://images.unsplash.com/photo-1502301197179-65228ab57f78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80',
            },
            {
                id: 17,
                image: 'https://images.unsplash.com/photo-1531938716357-224c16b5ace3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
            },
            {
                id: 18,
                image: 'https://images.unsplash.com/photo-1568571959361-3bffbad07499?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            },
            {
                id: 19,
                image: 'https://images.unsplash.com/photo-1595475349262-88ba1e1eecaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            },
        ],
    ];
    const [boxAction, setBoxAction] = useState<number>(0);
    return (
        <main>
            <div className="w-[975px] mx-auto justify-center items-center aspect-[1.6/1] hidden">
                <Icon className="text-4xl animate-spin" icon="icon-park:loading-one" />
            </div>
            <div className="max-w-[975px] mx-auto pt-6 px-5">
                {data.map((element, indexParent) => (
                    <div
                        key={indexParent}
                        className={cln('grid grid-cols-3 grid-rows-1 gap-7 mb-7', {
                            'grid-rows-2': element.length > 3,
                        })}
                    >
                        {element.map((item, index) => {
                            const indexActive: number = indexParent % 2 === 0 ? 2 : 0;
                            const activeCol: boolean = index === indexActive && element.length > 3;
                            return (
                                <div
                                    onMouseEnter={() => {
                                        setBoxAction(item.id);
                                    }}
                                    onMouseLeave={() => {
                                        setBoxAction(0);
                                    }}
                                    key={index}
                                    className={cln('relative', {
                                        'row-span-2': activeCol,
                                    })}
                                >
                                    <div className="w-full h-full">
                                        <img
                                            className={cln({
                                                'aspect-square': !activeCol,
                                            })}
                                            src={item.image}
                                            alt=""
                                        />
                                    </div>
                                    <div className="absolute top-2 right-2">
                                        <span>
                                            <ClipIcon color="#fff" />
                                        </span>
                                        <span>
                                            <Icon className="text-2xl text-white" icon="ion:copy" />
                                        </span>
                                    </div>
                                    {boxAction === item.id ? (
                                        <>
                                            <div
                                                className={cln(
                                                    'absolute inset-0 bg-[#2d2d2d66] items-center justify-center gap-x-5 flex',
                                                )}
                                            >
                                                <div className="text-white flex items-center">
                                                    <Icon className="text-xl" icon="mdi:heart" />
                                                    <span className="pl-1 font-bold text-lg">2.000</span>
                                                </div>
                                                <div className="text-white flex items-center">
                                                    <Icon className="text-xl" icon="fe:comment" />
                                                    <span className="pl-1 font-bold text-lg">200</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Explore;
