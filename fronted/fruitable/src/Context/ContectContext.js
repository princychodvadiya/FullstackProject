import { createContext, useReducer } from "react"
import { ContectReducer } from "./reducer/Contect.reducer";
import axios from "axios";
import { baseURL } from "../utils/baseURL";
import { ADD_CONTECT, DELETE_CONTECT, GET_CONTECT, UPADTE_CONTECT } from "./ActionType";

const initialState = {
    isLoading: false,
    contact: [],
    error: null,
}

export const ContectContext = createContext();

export const ContectProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ContectReducer, initialState);

    const addContect = async (data) => {
        try {
            const response = await axios.post(baseURL + 'contacts', data)
            // console.log(response.data);

            dispatch({ type: ADD_CONTECT, payload: response.data })
        } catch (error) {

        }
    }
    const getContect = async (data) => {
        try {
            const response = await axios.get(baseURL + 'contacts', data)
            // console.log(response.data);

            dispatch({ type: GET_CONTECT, payload: response.data })
        } catch (error) {

        }

    }

    const deleteContect = async (id) => {
        try {
            const response = await axios.delete(baseURL + 'contacts/' + id)
            // console.log(response.id);

            dispatch({ type: DELETE_CONTECT, payload: id })
        } catch (error) {

        }

    }

    const updateContect = async (data) => {
        try {
            const response = await axios.put(baseURL + 'contacts/' + data.id, data)
            // console.log(response.id);

            dispatch({ type: UPADTE_CONTECT, payload: response.data })
        } catch (error) {

        }

    }
    return (
        <ContectContext.Provider
            value={{
                ...state,
                addContect,
                getContect,
                deleteContect,
                updateContect
            }}
        >
            {children}
        </ContectContext.Provider>
    )

}