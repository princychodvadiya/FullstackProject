import { ADD_REVIEW } from "../ActionType";

export const ReviewReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case ADD_REVIEW:
            return {
                review: action.payload
            }
        default:
            return state;
    }
}