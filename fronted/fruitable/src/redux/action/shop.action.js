import { Axios } from "axios"
import { baseURL } from "../../utils/baseURL"
import axios from 'axios';
import { GET_FRUITS } from "../ActionType";

export const getFruits = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "fruits")
            .then((Response) => {
                dispatch({ type: GET_FRUITS, payload: Response.data })
            })
            .catch((error) => {
                console.log(error.message);
            })
    } catch (error) {

    }
}