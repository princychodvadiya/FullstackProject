import { createContext, useContext, useReducer } from "react"
import { ReviewReducer } from "./reducer/Review.reducer";
import { ADD_REVIEW, GET_REVIEW } from "./ActionType";

const initialState = {
    review: []
}

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ReviewReducer, initialState)

    const GetReview = (data) => {
        console.log(data);
        dispatch({ type: GET_REVIEW })
    }
    const AddReview = (data) => {   
        console.log(data);
        dispatch({ type: ADD_REVIEW, payload: data })
    }

    return (
        <ReviewContext.Provider value={{ ...state, AddReview, GetReview }}>
            {children}
        </ReviewContext.Provider>
    )

}