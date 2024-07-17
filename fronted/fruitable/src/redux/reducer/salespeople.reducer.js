import { ADD_SALESPEOPLE, DELETE_SALESPEOPLE, GET_SALESPEOPLE, UPDATE_SALESPEOPLE } from "../ActionType";

const initialState = {
    isLoading: false,
    salespeople: [],
    error: null
}

export const salespeopleReducer = (state = initialState, action) => {
    console.log(action.payload);
    switch (action.type) {
        case GET_SALESPEOPLE:
            return {
                ...state,
                isLoading: false,
                salespeople: action.payload.data,
                error: null
            }
        case ADD_SALESPEOPLE:
            return {
                ...state,
                isLoading: false,
                salespeople: state.salespeople.concat(action.payload.data)
            }
        case DELETE_SALESPEOPLE:
            return {
                ...state,
                isLoading: false,
                salespeople: state.salespeople.filter((v) => v.snum !== action.payload),
                error: null
            }
        case UPDATE_SALESPEOPLE:
            return {
                ...state,
                isLoading: false,
                salespeople: state.salespeople.map((v) => {
                    if (v.snum === action.payload.snum) {
                        return action.payload;
                    } else {
                        return v;

                    }
                })
            }
        default:
            return state
    }
}