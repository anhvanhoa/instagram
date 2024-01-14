import { useState } from 'react'
import TippyHeadLess from '@tippyjs/react/headless'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import 'tippy.js/animations/scale.css'
import Wrapper from '~/components/Wrapper'
import classNames from 'classnames'
import IconApp from '~/assets/icons/IconApp'
import BoxMenu from './BoxMenu'

const Menu = () => {
    const [active, setActive] = useState<boolean>(false)
    const handleMenu = () => setActive(active ? false : true)
    const handleClickOutside = () => setActive(false)

    return (
        <TippyHeadLess
            trigger='click'
            interactive
            offset={[30, 15]}
            onHidden={handleClickOutside}
            delay={[0, 50]}
            render={() => (
                <Wrapper>
                    <BoxMenu />
                </Wrapper>
            )}
        >
            <Tippy content='More' placement='right' delay={[1000, 0]} theme='light' animation='scale'>
                <div
                    className={classNames(
                        {
                            'isActive font-bold': active,
                        },
                        'flex items-center p-3 my-1 cursor-pointer select-none rounded-md hover:bg-gray-100 group',
                    )}
                    onClick={handleMenu}
                >
                    <div className='flex items-center'>
                        <span className={classNames('group-hover:scale-105 transition-all')}>
                            <IconApp type={active ? 'menu-solid' : 'menu-thin'} />
                        </span>
                        <p
                            className={classNames(
                                'pl-4 whitespace-nowrap group-[.is-cllapse]:hidden',
                                'hidden lg:block',
                            )}
                        >
                            More
                        </p>
                    </div>
                </div>
            </Tippy>
        </TippyHeadLess>
    )
}

export default Menu
