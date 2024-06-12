import { ADD_FACILITIES, DELETE_FACILITIES, GET_FACILITIES, LOADING_FACILITIES, UPDATE_FACILITIES } from "../ActionType"

export const handleLoading = () => (dispatch) => {
    dispatch({ type: LOADING_FACILITIES })
}

export const AddFacilities = (data) => (dispatch) => {
    dispatch(handleLoading());
    setTimeout(() => {
        dispatch({ type: ADD_FACILITIES, payload: data })
    }, 1000)
}

export const getFacilities = () => (dispatch) => {
    dispatch({ type: GET_FACILITIES })
}


export const deleteFacilities = (id) => (dispatch) => {
    dispatch(handleLoading());
    setTimeout(() => {
        dispatch({ type: DELETE_FACILITIES, payload: id })
    }, 2000)
}

export const updateFacilities = (data) => (dispatch) => {
    dispatch(handleLoading());
    setTimeout(() => {
        dispatch({ type: UPDATE_FACILITIES, payload: data })
    }, 1000)
}
