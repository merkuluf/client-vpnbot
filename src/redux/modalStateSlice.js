import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
}

const modalStateSlice = createSlice({
    name: 'modalState',
    initialState,
    reducers: {
        setModalLoading: (state, action) => {
            state.isLoading = action.payload
        },
    },
})

export const { setModalLoading, stopLoading } = modalStateSlice.actions
export default modalStateSlice.reducer
