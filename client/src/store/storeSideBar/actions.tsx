export const setActiveItem = (payload: number) => ({
    type: 'SET_ACTIVE_ITEM',
    payload,
});
export const setSidebar = (payload: boolean) => ({
    type: 'SET_SIDEBAR',
    payload,
});
export const setSearch = (payload: boolean) => ({
    type: 'SET_SEARCH',
    payload,
});
export const setNotify = (payload: boolean) => ({
    type: 'SET_NOTIFY',
    payload,
});
export const setCreatePosts = (payload: boolean) => ({
    type: 'SET_CREATE_POSTS',
    payload,
});
export const setBoxSearch = (payload: boolean) => ({
    type: 'SET_BOX_SEARCH',
    payload,
});
export const setBoxNotify = (payload: boolean) => ({
    type: 'SET_BOX_NOTIFY',
    payload,
});
export const setChat = (payload: boolean) => ({
    type: 'HANDLE_CHAT',
    payload,
});
