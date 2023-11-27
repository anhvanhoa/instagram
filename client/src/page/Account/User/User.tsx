import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '@iconify/react';
import SettingIcon from '~/components/Icon/SettingIcon';
import Button from '~/components/Button/Button';
import { useEffect, useState } from 'react';
import httpGetUser from '~/apis/httpGetUser';
import { User as TypeUser } from '~/types/auth';
import images from '~/assets/images';
import { initialUser } from '~/types/auth';

const User = () => {
    const [user, setUser] = useState<TypeUser>(initialUser);
    useEffect(() => {
        httpGetUser()
            .then((res) => {
                setUser(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div>
            <div className="max-w-[975px] mx-auto pt-[30px] px-5">
                <div className="flex items-start mb-11">
                    <div className="w-[31%] mr-[30px] relative">
                        <div className="w-[150px] h-[150px] mx-auto">
                            <img src={user.avatar || images.notAvatar} alt="" className="rounded-circle" />
                            <div className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[168px] h-[168px]">
                                <svg width={168} height={168}>
                                    <linearGradient id="my-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="5%" stopColor="#F4A14B" />
                                        <stop offset="50%" stopColor="#E1306C" />
                                        <stop offset="100%" stopColor="#A233FA" />
                                    </linearGradient>
                                    <circle
                                        cx={84}
                                        cy={84}
                                        r={82}
                                        // stroke="#BDBDBD"
                                        stroke="url(#my-gradient)"
                                        fill="transparent"
                                        strokeWidth={3}
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center">
                            <h2 className="text-xl pr-5">{user.userName}</h2>
                            <div className="flex gap-3">
                                <Button className="h-8 bg-[#EFEFEF] text-black hover:bg-[#DBDBDB]">
                                    Chỉnh sửa trang cá nhân
                                </Button>
                                <Button className="bg-[#EFEFEF] text-black hover:bg-[#DBDBDB]">Xem kho lưu trữ</Button>
                            </div>
                            <div className="py-2 px-4">
                                <SettingIcon />
                            </div>
                        </div>
                        <div className="w-full mb-5"></div>
                        <div className="flex items-center mb-5">
                            <p className="mr-10">
                                <span className="pr-2 font-semibold">{user.posts}</span>
                                bài viết
                            </p>
                            <p className="mr-10">
                                <span className="pr-2 font-semibold">{user.follower}</span>
                                người theo dõi
                            </p>
                            <p className="mr-10">
                                Đang theo dõi
                                <span className="px-2 font-semibold">{user.following}</span>
                                người dùng
                            </p>
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold">{user.fullName}</p>
                            <div>{user.bio}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-center items-center border-t border-[#ccc]">
                        <NavLink
                            to="/anhvanhoa.it/"
                            className={({ isActive }) =>
                                classNames('flex items-center mr-[60px] py-5 border-t', {
                                    'border-black': isActive,
                                    'border-transparent': !isActive,
                                })
                            }
                        >
                            <span className="text-xs">
                                <Icon icon="mdi:grid" />
                            </span>
                            <span className="uppercase text-xs font-medium px-1">Bài viết</span>
                        </NavLink>
                        <NavLink
                            to="/anhvanhoa.it/saved/"
                            className={({ isActive }) =>
                                classNames('flex items-center mr-[60px] py-5 border-t', {
                                    'border-black': isActive,
                                    'border-transparent': !isActive,
                                })
                            }
                        >
                            <span className="">
                                <Icon icon="fluent:bookmark-16-regular" />
                            </span>
                            <span className="uppercase text-xs font-medium px-1">Đã lưu</span>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                classNames('flex items-center py-5 border-t', {
                                    'border-black': isActive,
                                    'border-transparent': !isActive,
                                })
                            }
                            to="/anhvanhoa.it/tagged/"
                        >
                            <span>
                                <Icon icon="ph:user-square" />
                            </span>
                            <span className="uppercase text-xs font-medium px-1">Được gắn thẻ</span>
                        </NavLink>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="aspect-square">
                            <img
                                src="https://images.unsplash.com/photo-1682687220247-9f786e34d472?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                        </div>
                        <div className="aspect-square">
                            <img
                                src="https://images.unsplash.com/photo-1682687220247-9f786e34d472?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
