import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import tokenReducer from './tokenSlice'
import modalStateReducer from './modalStateSlice'
import { adminApi } from './adminApi'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        token: tokenReducer,
        modalState: modalStateReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware)
            .concat(adminApi.middleware),
})
