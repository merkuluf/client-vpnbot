import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../utils/BASE'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: (builder) => ({
        getValidation: builder.query({
            query: (initData) => `/validate?${initData}`,
        }),
        getAvailableServers: builder.query({
            query: (token) => ({
                url: `/server/available`,
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
        issueTestVpnKey: builder.mutation({
            query: (body) => ({
                url: `/testkey`,
                body: body,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${body.token}`,
                },
            }),
        }),
        recordTaps: builder.mutation({
            query: (body) => ({
                url: `/taps`,
                body: body,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${body.token}`,
                },
            }),
        }),
        getPlans: builder.query({
            query: (token) => ({
                url: `/lava/plans`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        createLavaPayment: builder.mutation({
            query: (body) => ({
                url: '/lava/payment',
                method: 'POST',
                body: body,
                headers: {
                    Authorization: `Bearer ${body.token}`,
                },
            }),
        }),
        getPaymentStatus: builder.query({
            query: (params) => ({
                url: `/lava/payment?paymentId=${params.paymentId}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${params.token}`,
                },
            }),
        }),
    }),
})

export const {
    useGetValidationQuery,
    useIssueTestVpnKeyMutation,
    useLazyGetUserQuery,
    useRecordTapsMutation,
    useGetUserQuery,
    useGetAvailableServersQuery,
    useGetPlansQuery,
    useCreateLavaPaymentMutation,
    useGetPaymentStatusQuery,
} = api
