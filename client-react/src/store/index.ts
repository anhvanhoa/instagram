import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import { useDispatch } from 'react-redux';
import { userApi } from '~/services/userApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '~/services/authApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, authApi.middleware),
});
setupListeners(store.dispatch);

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
