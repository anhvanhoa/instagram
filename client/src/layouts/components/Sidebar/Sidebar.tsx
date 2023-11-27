import React, { useRef } from 'react';
import { useContextSidebar, actions } from '~/store/storeSideBar';
import Menu from '~/layouts/components/Menu';
import Navbar from '~/layouts/components/Navbar';
import Search from '~/layouts/components/Search';
import Notify from '~/layouts/components/Notify';
import CreatePosts from '~/layouts/components/CreatePosts';
import Logo from './Logo';
import User from './User';
import useLogic from './useLogic';

const Sidebar: React.FC = () => {
    const myRef = useRef<HTMLDivElement>(null);
    const { state, dispatch } = useContextSidebar();
    const { sidebar, search, notify, createPosts, boxSearch, boxNotify, chat } = state;
    const { handleCloseMode, handleClose } = useLogic();
    function handleMouseDown(event: MouseEvent) {
        if (myRef.current && !myRef.current.contains(event.target as Node)) {
            handleCloseMode();
            if (chat) {
                dispatch(actions.setChat(true));
                dispatch(actions.setSidebar(true));
            } else {
                dispatch(actions.setSidebar(false));
            }
        }
    }
    return (
        <header ref={myRef} className={`relative w-sidebar ${chat ? 'w-small-sidebar' : ''}`}>
            <nav
                className={`transition-all duration-100 ease-linear px-3 pt-2 pb-5 sticky top-0 flex flex-col justify-between h-screen border-r border-solid border-[#ccc]/70 z-[99] bg-white ${
                    sidebar ? 'w-small-sidebar border-[#ccc]/40' : 'w-sidebar'
                }`}
            >
                <div className="">
                    <Logo handleCloseMode={handleCloseMode} sidebar={sidebar} />
                    <Navbar />
                    <User sidebar={sidebar} handleCloseMode={handleCloseMode} />
                </div>
                <div className="">
                    <Menu sidebar={sidebar} />
                </div>
            </nav>
            {search && (
                <Search handleMouseDown={handleMouseDown} handleCloseMode={handleCloseMode} active={boxSearch} />
            )}
            {notify && <Notify handleMouseDown={handleMouseDown} active={boxNotify} />}
            {createPosts && <CreatePosts handleClose={handleClose} />}
        </header>
    );
};

export default Sidebar;
