import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import axiosInstance from "../../../utils/axiosinstance";

const initialState = {
    isAuthentication: false,
    isLogOut: true,
    isLoading: false,
    error: null,
    data: null
}

export const register = createAsyncThunk(
    'users/register',
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);

            // const response = await axiosInstance.post('http://localhost:8000/api/v1/users/register', data)
            const response = await axiosInstance.post('/users/register', data)

            console.log(response);

            if (response.status === 201) {
                return response.data
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue('registration erorr.' + error.response.data.message)
        }
    }
)

export const login = createAsyncThunk(
    'users/login',
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);
            // const response = await axiosInstance.post('http://localhost:8000/api/v1/users/login', data)
            const response = await axiosInstance.post('/users/login', data)
            console.log(response);

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue('login erorr.' + error.response.data.message)
        }
    }
)

export const logout = createAsyncThunk(
    'users/logout',
    async (_id, { rejectWithValue }) => {
        try {
            console.log(_id);
            const response = await axiosInstance.post('/users/logout', { _id })
            console.log(response);

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue('logout erorr.' + error.response.data.message)
        }

    }
)

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.isAuthentication = false;
            state.isLogOut = true;
            state.isLoading = false;
            state.error = null;
            state.data = action.payload
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isAuthentication = false;
            state.isLogOut = true;
            state.isLoading = false;
            state.error = action.payload;
            state.data = null
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuthentication = true;
            state.isLogOut = false;
            state.isLoading = false;
            state.error = null;
            state.data = action.payload
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isAuthentication = false;
            state.isLogOut = true;
            state.isLoading = false;
            state.error = action.payload;
            state.data = null
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isAuthentication = true;
            state.isLogOut = true;
            state.isLoading = false;
            state.error = null;
            state.data = action.payload
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.isAuthentication = true;
            state.isLogOut = false;
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export default loginSlice.reducer