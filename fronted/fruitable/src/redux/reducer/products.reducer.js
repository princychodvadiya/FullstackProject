import { ADD_PRODUCTS, DELETE_PRODUCTS, ERROR_PRODUCTS, GET_PRODUCTS, LOADING_PRODUCTS, UPDATE_PRODUCTS } from "../ActionType";

export const initialState = {
    isLoading: false,
    products: [],
    error: null
}

export const productsReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case LOADING_PRODUCTS:
            return {
                isLoading: true,
                products: [],
                error: null
            }
        case ERROR_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case GET_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                products: action.payload.data,
                error: null
            }
        case ADD_PRODUCTS:
            return {
                isLoading: false,
                products: state.products.concat(action.payload.data),
                error: null
            }

        case DELETE_PRODUCTS:
            return {
                isLoading: false,
                products: state.products.filter((v) => v._id !== action.payload),
                error: null
            }


        case UPDATE_PRODUCTS:
            return {
                isLoading: false,
                products: state.products.map((v) => {
                    if (v._id === action.payload._id) {
                        return action.payload
                    }
                    return v
                }),
                error: null
            }
        default:
            return state
    }
}
