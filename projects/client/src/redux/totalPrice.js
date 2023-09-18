import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: 0
}

const totalPriceSlice = createSlice({
    name: 'total',
    initialState,
    reducers: {
        setPrice: (state, action) => {
            state.value = action.payload
        },
}})

export const { setPrice  } = totalPriceSlice.actions
export default totalPriceSlice.reducer