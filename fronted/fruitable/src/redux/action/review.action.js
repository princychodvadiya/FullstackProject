import { baseURL } from "../../utils/baseURL";
import { ADD_REVIEW, DELETE_REVIEW, GET_REVIEW, UPDATE_REVIEW } from "../ActionType";
import axios from 'axios';

export const getReview = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "review")
            .then((Response) => {
                dispatch({ type: GET_REVIEW, payload: Response.data })
            })
            .catch((error) => {
                console.log(error.message);
            })
    } catch (error) {

    }
}

export const addReview = (data) => async (dispatch) => {
    try {
        await axios.post(baseURL + "review", data)
            .then((Response) => {
                dispatch({ type: ADD_REVIEW, payload: Response.data })
            })
            .catch((error) => {
                console.log(error.message);
            })
    } catch (error) {

    }
}

export const deleteReview = (id) => async (dispatch) => {
    try {
        await axios.delete(baseURL + "review/" + id)
            .then((Response) => {
                dispatch({ type: DELETE_REVIEW, payload: id })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}


export const editReview = (data) => async (dispatch) => {
    try {

        await axios.put(baseURL + "review/" + data.id, data)
            .then((Response) => {
                dispatch({ type: UPDATE_REVIEW, payload: data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}