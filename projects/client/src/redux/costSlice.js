import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: 0
}

const costSlice = createSlice({
    name: 'cost',
    initialState,
    reducers: {
        setCost: (state, action) => {
            state.value = action.payload
        },
}})

export const { setCost  } = costSlice.actions
export default costSlice.reducer