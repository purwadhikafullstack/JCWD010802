import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload
        },
        setLogOut: (state) => {
            state.value = {}
        }
    }
})

export const { setValue, setLogOut } = userSlice.actions
export default userSlice.reducer