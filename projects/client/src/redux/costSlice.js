import { createSlice } from "@reduxjs/toolkit"


const initialState = {

    value: 0,
    ship:""
}

const costSlice = createSlice({
    name: 'cost',
    initialState,
    reducers: {
        setCost: (state, action) => {
            state.value = action.payload
        },
        setShip: (state, action) => {
            state.ship = action.payload
        },
}})

export const { setCost,setShip  } = costSlice.actions
export default costSlice.reducer