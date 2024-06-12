import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../utils/BASE'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        getValidation: builder.query({
            query: (initData) => `/validate?${initData}`,
        }),
        getUserKeys: builder.query({
            query: (token) => ({
                url: `/user/keys`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        getUser: builder.query({
            query: (token) => ({
                url: `/user`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
})

export const { useGetValidationQuery, useGetUserKeysQuery, useGetUserQuery } =
    api
