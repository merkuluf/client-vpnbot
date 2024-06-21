import { createSlice } from '@reduxjs/toolkit'

interface initialStateProps {
    isLoading: boolean
}

const initialState: initialStateProps = {
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

export const { setModalLoading } = modalStateSlice.actions
export default modalStateSlice.reducer
