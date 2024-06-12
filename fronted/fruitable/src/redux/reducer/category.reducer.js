import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "../ActionType";

const initialState = {
    isLoading: false,
    category: [],
    error: null
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: action.payload.data,
                error: null
            }
        case ADD_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: [...state.category, action.payload.data],
                error: null
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: state.category.filter((v) => v._id !== action.payload),
                error: null
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: state.category.map((v) => (v._id === action.payload._id ? action.payload : v)),
                error: null
            }
        default:
            return state
    }
}
