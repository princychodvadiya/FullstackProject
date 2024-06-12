import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { baseURL } from "../../../utils/baseURL"

const initialState = {
    isLoading: false,
    coupon: [],
    error: null
}

export const AddCoupon = createAsyncThunk(
    'coupon/add',
    async (data) => {
        try {
            const response = await axios.post(baseURL + 'coupons', data)
            return response.data
        } catch (error) {
            console.log(error.massage);
        }
    }
)

export const GetCoupon = createAsyncThunk(
    'coupon/getAll',
    async (data) => {
        try {
            const response = await axios.get(baseURL + 'coupons', data)
            return response.data
        } catch (error) {
            console.log(error.massage);
        }
    }
)
export const DeleteCoupon = createAsyncThunk(
    'coupon/delete',
    async (id) => {
        try {
            const response = await axios.delete(baseURL + 'coupons/' + id)
            return response.data.id
        } catch (error) {
            console.log(error.massage);
        }
    }
)

export const EditCoupon = createAsyncThunk(
    'coupon/edit',
    async (data) => {
        try {
            const response = await axios.put(baseURL + 'coupons/' + data.id, data)
            return response.data
        } catch (error) {
            console.log(error.massage);
        }
    }
)
const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(AddCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.concat(action.payload)
        })
        builder.addCase(GetCoupon.fulfilled, (state, action) => {
            // console.log(action);
            state.coupon = action.payload
        })
        builder.addCase(DeleteCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.filter((v) => v.id !== action.payload)
        })
        builder.addCase(EditCoupon.fulfilled, (state, action) => {
            // state.coupon = state.coupon.map((v) => v.id === action.payload.id ? action.payload : v)
            state.coupon = state.coupon.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;

                } else {
                    return v;

                }
            })
        })
    }
})

export default couponSlice.reducer;