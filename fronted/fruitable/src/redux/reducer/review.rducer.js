import { ADD_REVIEW, DELETE_REVIEW, GET_REVIEW, UPDATE_REVIEW } from "../ActionType";

export const initialState = {
    isLoading: false,
    review: [],
    error: null
}

export const reviewReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case GET_REVIEW:
            return {
                isLoading: false,
                review: action.payload,
                error: null
            }
        case ADD_REVIEW:
            return {
                isLoading: false,
                review: state.review.concat(action.payload),
                error: null
            }

        case DELETE_REVIEW:
            return {
                isLoading: false,
                review: state.review.filter((v) => v.id !== action.payload),
                error: null
            }
        case UPDATE_REVIEW:
            return {
                isLoading: false,
                review: state.review.map((v) => {
                    if (v.id === action.payload.id) {
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

