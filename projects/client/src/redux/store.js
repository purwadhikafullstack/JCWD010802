import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import regisSlice from "./regisSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        regis: regisSlice
    }
})