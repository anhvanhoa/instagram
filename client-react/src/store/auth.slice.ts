import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import jwtDecode from 'jwt-decode';
import { Auth, User, UserBasic } from '~/types/auth';

const accessToken = (() => {
    const crToken = localStorage.getItem('cr_token');
    if (!crToken) return '';
    const accessToken = CryptoJS.AES.decrypt(crToken, '1234').toString(CryptoJS.enc.Utf8);
    return accessToken;
})();
const id = (() => {
    try {
        const data: { _id: string } = jwtDecode(accessToken);
        return data._id;
    } catch (error) {
        return '';
    }
})();

const initialUser: UserBasic = {
    _id: id,
    accessToken,
    email: '',
    fullName: '',
    numberPhone: '',
    userName: '',
    avatar: '',
    fbId: '',
};
const initialState: Auth = {
    user: initialUser,
    isLoading: false,
    error: false,
};

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        startLogin: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        successLogin: (state, action: PayloadAction<UserBasic>) => {
            const user = action.payload;
            const encode = CryptoJS.AES.encrypt(user.accessToken, '1234').toString();
            localStorage.setItem('cr_token', encode);
            state.user = user;
            state.isLoading = false;
        },
        failLogin: (state) => {
            state.error = true;
            state.isLoading = false;
        },
        update: (state, action: PayloadAction<User>) => {
            state.user.avatar = action.payload.avatar;
            state.user.userName = action.payload.userName;
        },
        logout: () => {
            localStorage.removeItem('cr_token');
            window.location.reload();
        },
    },
});
const authReducer = authSlice.reducer;

export const { startLogin, successLogin, failLogin, update } = authSlice.actions;
export default authReducer;
