import { GET_FRUITS } from "../ActionType";

export const initialState = {
    isLoading: false,
    shop: [],
    error: null
}

export const shopReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case GET_FRUITS:
            return {
                isLoading: false,
                shop: action.payload,
                error: null
            }
        default:
            return state
    }
}