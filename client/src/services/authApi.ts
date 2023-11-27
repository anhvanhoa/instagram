import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthLogin, User } from '~/types/auth';

// initialize an empty api service that we'll inject endpoints into later as needed
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8008/api', credentials: 'include' }),
    endpoints: (build) => ({
        login: build.mutation<User, AuthLogin>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
        }),
        refreshToken: build.mutation<string, void>({
            query: () => ({
                url: '/auth/refresh-token',
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApi;
