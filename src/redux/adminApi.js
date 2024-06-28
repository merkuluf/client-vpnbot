import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ADM_URL } from '../utils/BASE'

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: ADM_URL }),
    endpoints: (builder) => ({
        createServer: builder.mutation({
            query: (body) => ({
                url: `/server`,
                body: body,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${body.token}`,
                },
            }),
        }),
        getServers: builder.query({
            query: (token) => ({
                url: `/servers`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        createLavaPlan: builder.mutation({
            query: (body) => ({
                url: `/lava/plan/`,
                body: body,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${body.token}`,
                },
            }),
        }),
        deleteLavaPlan: builder.mutation({
            query: (body) => ({
                url: `/lava/plan/`,
                body: body,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${body.token}`,
                },
            }),
        }),
    }),
})

export const { useCreateServerMutation, useGetServersQuery, useCreateLavaPlanMutation, useDeleteLavaPlanMutation } =
    adminApi
