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
        setPriceOut:(state, action)=>{
            state.value = 0
        }
}})

export const { setPrice, setPriceOut } = totalPriceSlice.actions
export default totalPriceSlice.reducer