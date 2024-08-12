import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

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

            const response = await axios.post('http://localhost:8000/api/v1/users/register', data)
            console.log(response);

            if (response.data === 201) {
                return response.data
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue('registration erorr.' + error.response.data.message)
        }
    }
)

export const login = createAsyncThunk(
    'usre/login',
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);
            const response = await axios.post('http://localhost:8000/api/v1/users/login', data)
            console.log(response);

            if (response.data === 200) {
                return response.data
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue('registration erorr.' + error.response.data.message)
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
            state.isAuthentication = false;
            state.isLogOut = true;
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
    }
})

export default loginSlice.reducer