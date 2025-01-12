import { ADD_PRODUCTS, DELETE_PRODUCTS, GET_PRODUCTS, UPDATE_PRODUCTS } from "../ActionType";

export const getProducts = () => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/products/list-product");
        const data = await response.json();
        console.log(data);
        dispatch({ type: GET_PRODUCTS, payload: data });
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
}

export const AddProduct = (product) => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/products/add-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        const data = await response.json();
        console.log(data);
        dispatch({ type: ADD_PRODUCTS, payload: data });
    } catch (error) {
        console.error("Failed to add product:", error);
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await fetch(`http://localhost:8000/api/v1/products/delete-product/${id}`, {
            method: 'DELETE'
        });
        dispatch({ type: DELETE_PRODUCTS, payload: id });
    } catch (error) {
        console.error("Failed to delete product:", error);
    }
}

export const updateProduct = (data) => async (dispatch) => {
    try {
        await fetch(`http://localhost:8000/api/v1/products/update-product/${data._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        dispatch({ type: UPDATE_PRODUCTS, payload: data });
    } catch (error) {
        console.error("Failed to update product:", error);
    }
}


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

