import { useCallback } from 'react';
import { useContextSidebar, actions } from '~/store/storeSideBar';

const useLogic = () => {
    const { state, dispatch } = useContextSidebar();
    const { search, notify, createPosts, chat } = state;
    const hiddenSearch = () => {
        chat ? dispatch(actions.setSidebar(true)) : dispatch(actions.setSidebar(false));
        dispatch(actions.setActiveItem(0));
        dispatch(actions.setBoxSearch(false));
        setTimeout(() => {
            dispatch(actions.setSearch(false));
        }, 150);
    };
    const hiddenNotify = () => {
        chat ? dispatch(actions.setSidebar(true)) : dispatch(actions.setSidebar(false));
        dispatch(actions.setActiveItem(0));
        dispatch(actions.setBoxNotify(false));
        setTimeout(() => {
            dispatch(actions.setNotify(false));
        }, 150);
    };

    const handleCloseMode = useCallback(() => {
        dispatch(actions.setChat(false));
        hiddenSearch();
        hiddenNotify();
        dispatch(actions.setSidebar(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showSearch = (id: number) => {
        dispatch(actions.setSidebar(true));
        dispatch(actions.setSearch(true));
        dispatch(actions.setActiveItem(id));
        dispatch(actions.setNotify(false));
        setTimeout(() => {
            dispatch(actions.setBoxSearch(true));
        }, 100);
    };

    const showNotify = (id: number) => {
        dispatch(actions.setSidebar(true));
        dispatch(actions.setActiveItem(id));
        dispatch(actions.setNotify(true));
        setTimeout(() => {
            dispatch(actions.setBoxNotify(true));
        }, 100);
    };

    const handleMode = (id: number) => {
        switch (id) {
            case 2: {
                if (search) {
                    hiddenSearch();
                } else {
                    hiddenNotify();
                    showSearch(id);
                }
                break;
            }
            case 5: {
                dispatch(actions.setChat(true));
                hiddenSearch();
                hiddenNotify();
                dispatch(actions.setSidebar(true));
                break;
            }
            case 6: {
                if (notify) {
                    hiddenNotify();
                } else {
                    hiddenSearch();
                    showNotify(id);
                }
                break;
            }
            case 7: {
                if (createPosts) {
                    dispatch(actions.setCreatePosts(false));
                } else {
                    dispatch(actions.setCreatePosts(true));
                    dispatch(actions.setActiveItem(id));
                }
                break;
            }
            default: {
                handleCloseMode();
            }
        }
    };
    const handleClose = () => {
        if (notify) dispatch(actions.setActiveItem(6));
        else if (search) dispatch(actions.setActiveItem(2));
        else dispatch(actions.setActiveItem(0));
        handleMode(7);
    };
    return { handleCloseMode, handleClose, handleMode };
};

export default useLogic;
