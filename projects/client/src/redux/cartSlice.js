import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: {}
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.value = action.payload
        },
}})

export const { setCart  } = cartSlice.actions
export default cartSlice.reducer