import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    cart: [],
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        AddcartSlice: (state, action) => {
            console.log(action);
            const index = state.cart.findIndex((v) => v.pid === action.payload.id)

            if (index !== -1) {
                state.cart[index].qty += action.payload.count;

            } else {
                state.cart.push({ pid: action.payload.id, qty: action.payload.count })
            }
        },
        Icrement_cart: (state, action) => {
            console.log(action.payload);

            const index = state.cart.findIndex((v) => v.pid === action.payload)
            console.log(index);

            state.cart[index].qty++
        },
        Decrement_cart: (state, action) => {
            const index = state.cart.findIndex((v) => v.pid === action.payload)
            console.log(index);
            if (state.cart[index].qty > 1) {
                state.cart[index].qty--;
            }
        },

        Remove_cartData: (state, action) => {
            const fdata = state.cart.filter((v) => v.pid !== action.payload)

            state.cart = fdata
        }
    }
})

export const { AddcartSlice, Icrement_cart, Decrement_cart, Remove_cartData } = cartSlice.actions;
export default cartSlice.reducer