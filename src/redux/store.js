import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import tokenReducer from './tokenSlice'
import modalStateReducer from './modalStateSlice'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        token: tokenReducer,
        modalState: modalStateReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})
