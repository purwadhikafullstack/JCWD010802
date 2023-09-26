import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import regisSlice from "./regisSlice"
import cartSlice from "./cartSlice"
import totalPriceSlice from "./totalPrice"
import costSlice from "./costSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        regis: regisSlice,
        cart: cartSlice,
        total: totalPriceSlice,
        cost: costSlice,
    }
})