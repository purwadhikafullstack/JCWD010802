import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: {},
    id: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.value = action.payload
        },
        setCartId: (state, action) => {
            state.id = action.payload
        },
        
       
}})

export const { setCart,setCartId  } = cartSlice.actions
export default cartSlice.reducer