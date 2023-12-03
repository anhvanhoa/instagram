import { TypeAction, StateSideBar, PayloadAction } from './type';
const initState: StateSideBar = {
    activeItem: 0,
    createPosts: false,
    notify: false,
    boxSearch: false,
    boxNotify: false,
    search: false,
    sidebar: false,
    chat: false,
};
const reducer = (state: StateSideBar, action: PayloadAction) => {
    switch (action.type) {
        case TypeAction.SET_ACTIVE_ITEM:
            return {
                ...state,
                activeItem: action.payload,
            };
        case TypeAction.SET_CREATE_POSTS:
            return {
                ...state,
                createPosts: action.payload,
            };
        case TypeAction.SET_NOTIFY:
            return {
                ...state,
                notify: action.payload,
            };
        case TypeAction.SET_BOX_SEARCH:
            return {
                ...state,
                boxSearch: action.payload,
            };
        case TypeAction.SET_SEARCH:
            return {
                ...state,
                search: action.payload,
            };
        case TypeAction.SET_SIDEBAR:
            return {
                ...state,
                sidebar: action.payload,
            };
        case TypeAction.HANDLE_CHAT:
            return {
                ...state,
                chat: action.payload,
            };
        case TypeAction.SET_BOX_NOTIFY:
            return {
                ...state,
                boxNotify: action.payload,
            };
        default:
            throw new Error('Error Invalid Action');
    }
};

export { initState };

export default reducer;
