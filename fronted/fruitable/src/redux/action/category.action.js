import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "../ActionType"

export const getCategory = () => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/categories/list-categories");
        const data = await response.json();
        dispatch({ type: GET_CATEGORY, payload: data });
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }
}

export const AddCategory = (category) => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/categories/add-category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        });

        const data = await response.json();
        dispatch({ type: ADD_CATEGORY, payload: data });
    } catch (error) {
        console.error("Failed to add category:", error);
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        await fetch(`http://localhost:8000/api/v1/categories/delete-category/${id}`, {
            method: 'DELETE'
        });
        dispatch({ type: DELETE_CATEGORY, payload: id });
    } catch (error) {
        console.error("Failed to delete category:", error);
    }
}

export const updateCategory = (data) => async (dispatch) => {
    try {
        await fetch(`http://localhost:8000/api/v1/categories/update-category/${data._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        dispatch({ type: UPDATE_CATEGORY, payload: data });
    } catch (error) {
        console.error("Failed to update category:", error);
    }
}
