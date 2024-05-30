import { useState } from 'react'
import TippyHeadLess from '@tippyjs/react/headless'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import 'tippy.js/animations/scale.css'
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
            onTrigger={(instance) => {
                const items = instance.popper.querySelectorAll('li')
                items.forEach((item) => (item.onclick = () => instance.hide()))
            }}
            delay={[0, 50]}
            render={() => <BoxMenu />}
        >
            <Tippy
                content='More'
                placement='right'
                delay={[1000, 0]}
                theme='light'
                animation='scale'
            >
                <div
                    className={classNames(
                        'flex items-center p-3 my-1 cursor-pointer select-none rounded-xl hover:bg-gray-100/80 hover:dark:bg-second group',
                        {
                            'isActive font-bold': active,
                        },
                    )}
                    onClick={handleMenu}
                >
                    <div className='flex items-center'>
                        <span
                            className={classNames('group-hover:scale-105 transition-all')}
                        >
                            <IconApp type={'menu-thin'} />
                        </span>
                        <p
                            className={classNames(
                                'pl-4 whitespace-nowrap group-[.is-cllapse]:hidden hidden lg:block',
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
