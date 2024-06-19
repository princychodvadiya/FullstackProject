import { ADD_PRODUCTS, DELETE_PRODUCTS, ERROR_PRODUCTS, GET_PRODUCTS, LOADING_PRODUCTS, UPDATE_PRODUCTS } from "../ActionType";
import axios from "axios";

const loadingproduct = () => ({ type: LOADING_PRODUCTS });

const errorproduct = (error) => (
    { type: ERROR_PRODUCTS, payload: error }
);

export const getdata = () => async (dispatch) => {
    try {
        dispatch(loadingproduct());
        const response = await fetch("http://localhost:8000/api/v1/products/list-product");
        const data = await response.json();
        dispatch({ type: GET_PRODUCTS, payload: data });
    } catch (error) {
        dispatch(errorproduct(error.message));
    }
};

export const addproductdata = (product) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/products/add-product", product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        // const dataproduct = await response.json();
        dispatch({ type: ADD_PRODUCTS, payload: response.data.data });
    } catch (error) {
        dispatch(errorproduct(error.message));
    }
};

export const editproductdata = (product) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/v1/products/update-product/${product._id}`, product, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        dispatch({ type: UPDATE_PRODUCTS, payload: response.data.data });
    } catch (error) {
        // dispatch({ type: ERROR_PRODUCTS, payload: error.message });
        dispatch(errorproduct(error.message));
    }
};


// export const editproductdata = (data) => async (dispatch) => {
//     try {
//         const response = await fetch("http://localhost:8000/api/v1/products/update-product/" + data._id, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });
//         const datapro = await response.json();
//         dispatch({ type: UPDATE_PRODUCTS, payload: datapro });
//     } catch (error) {
//         dispatch(errorproduct(error.message));
//     }
// };

export const deleteproductdata = (_id) => async (dispatch) => {
    try {
        await fetch(`http://localhost:8000/api/v1/products/delete-product/${_id}`, {
            method: 'DELETE'
        });
        dispatch({ type: DELETE_PRODUCTS, payload: _id });
    } catch (error) {
        dispatch(errorproduct(error.message));
    }
};




// import axios from 'axios';
// import { baseURL } from '../../utils/baseURL';
// import { GET_PRODUCTS, LOADING_PRODUCTS, ADD_PRODUCTS, DELETE_PRODUCTS, UPDATE_PRODUCTS, ERROR_PRODUCTS } from '../ActionType';

// const handleLoading = () => (dispatch) => {
//     dispatch({ type: LOADING_PRODUCTS })
// }

// const handelError = (error) => (dispatch) => {
//     // dispatch({ type: ERROR_PRODUCTS, payload: error })
// }
// export const getProducts = () => async (dispatch) => {
//     dispatch(handleLoading())
//     try {
//         await axios.get(baseURL + "products/list-product")
//             .then((Response) => {
//                 setTimeout(() => {
//                     dispatch({ type: GET_PRODUCTS, payload: Response.data })
//                 }, 2000)
//             })
//             .catch((error) => {
//                 dispatch(handelError(error.message))
//             })
//     } catch (error) {
//         dispatch(handelError(error.message))

//     }
// }


// export const addProducts = (data) => async (dispatch) => {
//     try {
//         dispatch(handleLoading())

//         await axios.post(baseURL + "products/add-product", data)
//             .then((Response) => {
//                 dispatch({ type: ADD_PRODUCTS, payload: Response.data })
//             })
//             .catch((error) => {
//                 dispatch(handelError(error.message))
//             })
//     } catch (error) {
//         dispatch(handelError(error.message))

//     }
// }

// export const deleteProducts = (id) => async (dispatch) => {
//     try {
//         dispatch(handleLoading())

//         await axios.delete(baseURL + "products/delete-product" + id)
//             .then((Response) => {
//                 dispatch({ type: DELETE_PRODUCTS, payload: id })
//             })
//             .catch((error) => {
//                 dispatch(handelError(error.message))
//             })
//     } catch (error) {
//         dispatch(handelError(error.message))

//     }
// }


// export const editProducts = (data) => async (dispatch) => {
//     try {
//         dispatch(handleLoading())

//         await axios.put(baseURL + "products/update-product" + data.id, data)
//             .then((Response) => {
//                 dispatch({ type: UPDATE_PRODUCTS, payload: Response.data })
//             })
//             .catch((error) => {
//                 dispatch(handelError(error.message))
//             })
//     } catch (error) {
//         dispatch(handelError(error.message))

//     }
// }

