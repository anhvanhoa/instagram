import { ReactNode } from 'react';
export enum TypeAction {
    SET_ACTIVE_ITEM = 'SET_ACTIVE_ITEM',
    SET_SIDEBAR = 'SET_SIDEBAR',
    SET_SEARCH = 'SET_SEARCH',
    SET_NOTIFY = 'SET_NOTIFY',
    SET_CREATE_POSTS = 'SET_CREATE_POSTS',
    SET_BOX_SEARCH = 'SET_BOX_SEARCH',
    SET_BOX_NOTIFY = 'SET_BOX_NOTIFY',
    HANDLE_HIDE_BOX = 'HANDLE_HIDE_BOX',
    HANDLE_CHAT = 'HANDLE_CHAT',
}

export interface StateSideBar {
    activeItem: number;
    sidebar: boolean;
    search: boolean;
    notify: boolean;
    createPosts: boolean;
    boxSearch: boolean;
    boxNotify: boolean;
    chat: boolean;
}

export interface PayloadAction {
    type: string;
    payload: any;
}

export interface PropsProvider {
    children: ReactNode;
}
