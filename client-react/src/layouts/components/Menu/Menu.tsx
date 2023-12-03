import { useState } from 'react';
import TippyHeadLess from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import images from '~/assets/images';
import BoxMenu from './BoxMenu';
import Wrapper from '~/components/Wrapper';
import classNames from 'classnames';

const Menu = ({ sidebar }: { sidebar: boolean }) => {
    const [active, setActive] = useState<boolean>(false);
    const handleMenu = () => {
        setActive(active ? false : true);
    };
    const handleClickOutside = () => {
        setActive(false);
    };

    return (
        <TippyHeadLess
            trigger="click"
            interactive
            offset={sidebar ? [95, 15] : [25, 15]}
            onHidden={handleClickOutside}
            delay={[0, 100]}
            render={(attrs) => (
                <Wrapper>
                    <BoxMenu />
                </Wrapper>
            )}
        >
            <div
                className={classNames(
                    {
                        'isActive font-bold': active,
                        'rounded-circle': sidebar,
                    },
                    'flex items-center p-3 my-1 cursor-pointer select-none rounded-md hover:bg-hovSidebar group',
                )}
                onClick={handleMenu}
            >
                <Tippy
                    content="Xem thêm"
                    placement="right"
                    delay={[1000, 0]}
                    offset={[0, 25]}
                    disabled={!sidebar}
                    theme="light"
                    animation="scale"
                >
                    <span className={classNames('group-hover:scale-105 transition-all')}>
                        <img
                            className={classNames('group-[.isActive]:hidden')}
                            src={images.menu_icon_thin}
                            alt="menu_icon_thin"
                        />
                        <img
                            className={classNames('hidden group-[.isActive]:block')}
                            src={images.menu_icon_solid}
                            alt="menu_icon_solid"
                        />
                    </span>
                </Tippy>
                {sidebar ? <></> : <p className={classNames('pl-4 whitespace-nowrap')}>Xem thêm</p>}
            </div>
        </TippyHeadLess>
    );
};

export default Menu;
