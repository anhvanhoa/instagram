import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '~/types/auth';

// initialize an empty api service that we'll inject endpoints into later as needed
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8008/api' }),
    endpoints: (build) => ({
        getUser: build.query<User, void>({
            query: () => ({
                url: '/auth/user',
            }),
        }),
    }),
});

export const { useGetUserQuery } = userApi;
