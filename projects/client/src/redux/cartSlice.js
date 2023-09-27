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
        setCartOut:(state,action) =>{
            state.value = {}
            state.id = 0
        }
        
       
}})

export const { setCart,setCartId, setCartOut  } = cartSlice.actions
export default cartSlice.reducer