import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { ObjectId } from 'bson'; // Import ObjectId
import { AddCategory, deleteCategory, getCategory, updateCategory } from '../../../redux/action/category.action';

export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);

    const dispatch = useDispatch();
    const categories = useSelector(state => state.category);

    const categoryList = categories.category || [];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };

    let CategorySchema = object({
        name: string().required("Please enter name"),
        description: string().required("Please enter description")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: CategorySchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(updateCategory({ ...values, _id: update }));
            } else {
                const newId = new ObjectId(); // Generate a new ObjectId
                dispatch(AddCategory({ ...values, _id: newId }));
            }
            resetForm();
            handleClose();
        },
    });

    const columns = [
        { field: 'name', headerName: 'Name' },
        { field: 'description', headerName: 'Description' },
        {
            field: 'delete', headerName: 'Delete',
            renderCell: (params) => (
                <DeleteIcon onClick={() => handleDelete(params.row._id)} />
            ),
        },
        {
            field: 'edit', headerName: 'Edit',
            renderCell: (params) => (
                <EditIcon onClick={() => handleEdit(params.row)} />
            ),
        }
    ];

    const handleDelete = (_id) => {
        dispatch(deleteCategory(_id));
    };

    const handleEdit = (data) => {
        setValues(data);
        setOpen(true);
        setUpdate(data._id);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                await dispatch(getCategory());
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, [dispatch]);

    const { handleSubmit, handleChange, handleBlur, errors, values, touched, setValues } = formik;

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Category
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Category</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Category"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name && touched.name}
                            helperText={errors.name && touched.name ? errors.name : ''}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            error={errors.description && touched.description}
                            helperText={errors.description && touched.description ? errors.description : ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={categoryList.filter(category => category && category._id)}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    getRowId={row => row._id}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}
