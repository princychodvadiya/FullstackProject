import { ADD_PRODUCTS, DELETE_PRODUCTS, ERROR_PRODUCTS, GET_PRODUCTS, LOADING_PRODUCTS, UPDATE_PRODUCTS } from "../ActionType";

const initialState = {
    isloading: false,
    product: [],
    error: null
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_PRODUCTS:
            return {
                ...state,
                isloading: true
            };
        case GET_PRODUCTS:
            return {
                ...state,
                isloading: false,
                product: action.payload.data,
                error: null
            };
        case ADD_PRODUCTS:
            return {
                isLoading: false,
                product: state.product.concat(action.payload.data),
                error: null
            };
        case UPDATE_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                product: state.product.map((v) => {
                    if (v._id === action.payload._id) {
                        return action.payload
                    } else {
                        return v;
                    }
                })
            };
        case DELETE_PRODUCTS:
            return {
                ...state,
                product: state.product.filter((v) => v._id !== action.payload),
                isloading: false,
                error: null
            };
        case ERROR_PRODUCTS:
            return {
                ...state,
                isloading: false,
                error: action.payload
            };
        default:
            return state;
    }
};