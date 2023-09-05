import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: {
        email: "",
        token: ""
    }
}

const regisSlice = createSlice({
    name: 'regis',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.value.email = action.payload.email
            state.value.token = action.payload.token
        },
        setVerif: (state) => {
            state.value.email = ""
            state.value.token = ""
        }
    }
})

export const { setEmail, setVerif } = regisSlice.actions
export default regisSlice.reducer