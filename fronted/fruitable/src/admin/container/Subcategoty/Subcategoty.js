import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addsubcategory, deleteSubcategory, getsubcategory, updateSubCategory } from '../../../redux/reducer/slice/subcategory.slice';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

export default function Subcategory() {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = React.useState(null);
    const [category, setCategory] = React.useState([]);

    const dispatch = useDispatch();
    const subcategories = useSelector(state => state.subcategory.subcategory);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };

    let categorySchema = object({
        name: string().required("Please enter name"),
        description: string().required("Please enter description").min(5, "Please enter minimum 5 characters"),
        category_id: string().required("Please select category")
    });

    const formik = useFormik({
        initialValues: {
            category_id: '',
            name: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(updateSubCategory({ ...values, _id: update }));
            } else {
                dispatch(addsubcategory(values));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values, setValues } = formik;

    const getCategoryData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/categories/list-categories");
            const categories = await response.json();
            setCategory(categories.data);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        getCategoryData();
        dispatch(getsubcategory());
    }, [dispatch]);

    const handleDelete = (_id) => dispatch(deleteSubcategory(_id));
    
    const handleEdit = (data) => {
        setOpen(true);
        setValues(data);
        setUpdate(data._id);
    };

    const columns = [
        {
            field: 'category_id', headerName: 'Category', width: 150,
            renderCell: (params) => {
                const categoryData = category.find(v => v._id === params.row.category_id);
                return categoryData ? categoryData.name : '';
            }
        },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'Action', headerName: 'Action', width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" size="large" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="large" onClick={() => handleDelete(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Subcategory
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subcategory</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <FormControl fullWidth margin="dense">
                            <InputLabel id="category_id-label">Select Category</InputLabel>
                            <Select
                                labelId="category_id-label"
                                id="category_id"
                                name="category_id"
                                value={values.category_id}
                                onChange={handleChange}
                                input={<OutlinedInput label="Select Category" />}
                            >
                                {category.map((v) => (
                                    <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                                ))}
                            </Select>
                            {errors.category_id && touched.category_id && <span style={{ color: "red" }}>{errors.category_id}</span>}
                        </FormControl>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Subcategory Name"
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
                            label="Subcategory Description"
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
                {subcategories && subcategories.length > 0 ? (
                    <DataGrid
                        rows={subcategories.filter(subcategory => subcategory && subcategory._id)}
                        columns={columns}
                        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        getRowId={rows => rows._id}
                    />
                ) : (
                    <p>No subcategories</p>
                )}
            </div>
        </>
    );
}
