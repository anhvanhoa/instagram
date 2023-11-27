import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import PropsNavbar from './PropsNavbar';
import { useContextSidebar } from '~/store/storeSideBar';
import useLogic from '~/layouts/components/Sidebar/useLogic';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';

const NavbarLink = ({ id, name, to, icon_solid, icon_thin }: PropsNavbar) => {
    const { state } = useContextSidebar();
    const { sidebar, activeItem } = state;
    const { handleMode } = useLogic();
    return (
        <>
            <Tippy
                key={id}
                content={name}
                placement="right"
                delay={[1000, 0]}
                disabled={!activeItem}
                theme="light"
                animation="scale"
            >
                <li className="my-1 rounded-md hover:bg-hovSidebar group">
                    <NavLink
                        to={to}
                        className={({ isActive }) =>
                            `${to !== '#' && isActive && !activeItem ? 'isActive group' : ''} ${
                                id === activeItem ? 'isActive-link group' : ''
                            }`
                        }
                        onClick={() => handleMode(id)}
                    >
                        <div className="flex items-center p-3 overflow-hidden border border-solid border-transparent group-[.isActive-link]:border-[#ccc]/50 rounded-md">
                            <span className="group-hover:scale-105 transition-all flex-shrink-0">
                                <img
                                    src={icon_thin}
                                    alt={name}
                                    className="block group-[.isActive]:hidden group-[.isActive-link]:hidden w-6 h-6"
                                />
                                <img
                                    src={icon_solid}
                                    alt={name}
                                    className="hidden group-[.isActive]:block group-[.isActive-link]:block w-6 h-6"
                                />
                            </span>
                            {sidebar ? (
                                <></>
                            ) : (
                                <span className="pl-4 whitespace-nowrap group-[.isActive]:font-bold">{name}</span>
                            )}
                        </div>
                    </NavLink>
                </li>
            </Tippy>
        </>
    );
};

export default memo(NavbarLink);
