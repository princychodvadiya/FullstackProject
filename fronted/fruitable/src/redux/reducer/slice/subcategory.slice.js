import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isloading: false,
    subcategory: [],
    error: null,
};

export const getsubcategory = createAsyncThunk(
    'subcategory/get',
    async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/subcategories/list-subcategories");
            return response.data.data;
        } catch (error) {
            console.log(error.message);
        }
    }
);

export const addsubcategory = createAsyncThunk(
    'subcategory/add',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/subcategories/add-subcategory", data);
            return response.data.data;
        } catch (error) {
            console.log(error.message);
        }
    }
);

export const deleteSubcategory = createAsyncThunk(
    'subcategory/delete',
    async (_id) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/subcategories/delete-subcategory/${_id}`);
            return { id: _id };
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateSubCategory = createAsyncThunk(
    'subcategory/update',
    async (data) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/subcategories/update-subcategory/${data._id}`, data);
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
);

const subcategorySlice = createSlice({
    name: "subcategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addsubcategory.fulfilled, (state, action) => {
                state.subcategory = state.subcategory.concat(action.payload);
            })
            .addCase(getsubcategory.fulfilled, (state, action) => {
                state.subcategory = action.payload || [];
            })
            .addCase(deleteSubcategory.fulfilled, (state, action) => {
                state.subcategory = state.subcategory.filter((v) => v._id !== action.payload.id);
            })
            .addCase(updateSubCategory.fulfilled, (state, action) => {
                state.subcategory = state.subcategory.map((v) => {
                    if (v._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                });
            });
    }
});

export default subcategorySlice.reducer;
