import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootType } from '~/store';
import images from '~/assets/images';

const User = ({ sidebar, handleCloseMode }: { sidebar: boolean; handleCloseMode: () => void }) => {
    const user = useSelector((state: RootType) => state.auth.user);
    return (
        <>
            <Tippy
                content={`Trang cá nhân`}
                placement="right"
                delay={[1000, 0]}
                disabled={!sidebar}
                theme="light"
                animation="scale"
            >
                <NavLink
                    to={user.userName}
                    onClick={() => {
                        handleCloseMode();
                    }}
                    className={({ isActive }) =>
                        classNames(
                            'rounded-md grid items-center grid-cols-[24px,1fr] p-3 my-1 cursor-pointer hover:bg-hovSidebar transition-all group',
                            {
                                'active-avatar': isActive,
                            },
                        )
                    }
                >
                    <div
                        className={classNames(
                            'rounded-circle overflow-hidden h-6 flex-shrink-0 group-hover:scale-105 transition-all',
                        )}
                    >
                        <img
                            src={user.avatar || images.notAvatar}
                            alt="Trang cá nhân"
                            className={classNames(
                                'border-[2px] border-solid group-[.active-avatar]:border-black border-transparent rounded-circle',
                            )}
                        />
                    </div>
                    {sidebar || (
                        <span className={classNames('pl-4 whitespace-nowrap group-[.active-avatar]:font-bold')}>
                            Trang cá nhân
                        </span>
                    )}
                </NavLink>
            </Tippy>
        </>
    );
};

export default memo(User);
