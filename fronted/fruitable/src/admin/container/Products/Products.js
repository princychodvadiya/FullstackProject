import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AddProduct, deleteProduct, getProducts, updateProduct } from '../../../redux/action/products.action';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { Spinner } from 'reactstrap';
import { Update } from '@mui/icons-material';
import { idID } from '@mui/material/locale';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { baseURL } from '../../../utils/baseURL';
import { getCategory } from '../../../redux/action/category.action';
import { getsubcategory } from '../../../redux/reducer/slice/subcategory.slice';
import { ObjectId } from 'bson';

function Products(props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [update, setupdate] = useState(false);
    const [data, setData] = useState([]);
    const [subcategoryData, setSubcategoryData] = useState([]);

    const products = useSelector(state => state.products)
    console.log(products);

    const subcategories = useSelector(state => state.subcategory.subcategory);
    console.log(subcategories);

    const categories = useSelector(state => state.category.category);
    console.log(categories);

    useEffect(() => {
        // dispatch(getProducts());
        // getProduct()
        dispatch(getProducts())
        dispatch(getCategory())
        dispatch(getsubcategory())
    }, [dispatch])

    // const getProduct = async () => {
    //     try {
    //         const response = await axios.get(baseURL + "product/list-product");
    //         console.log(response.data.data);
    //         const data = response.data.data;
    //         setData(data);
    //     } catch (error) {
    //     }
    // };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setupdate(null);
    };
    const handelDelete = (_id) => {
        dispatch(deleteProduct(_id))
    }

    const handelEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setupdate(true)
        setupdate(data._id);
    }

    const columns = [
        {
            field: 'category_id', headerName: 'Category', width: 150,
            renderCell: (params) => {
                const categoryData = categories.find(v => v._id === params.row.category_id);
                return categoryData ? categoryData.name : '';
            }
        },
        {
            field: 'subcategory_id', headerName: ' Subcategory Name', width: 160, valueGetter: (params) => {
                const subcategory = subcategories.find(
                    (v) => v._id === params.row.subcategory_id
                );
                return subcategory ? subcategory.name : "";
            }
        },
        { field: 'name', headerName: ' Products Name', width: 160 },
        { field: 'description', headerName: 'Products Description', width: 160 },
        { field: 'price', headerName: 'Products Price', width: 160 },
        { field: 'stock', headerName: 'Products Stock', width: 160 },

        {
            field: 'action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handelEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handelDelete(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    let productSchema = object({
        category_id: string().required("Please select category"),
        subcategory_id: string().required("please select subcategory"),
        name: string().required("please enter name"),
        description: string().required("please enter description"),
        price: string().required("please enter price"),
        stock: string().required("please enter stock"),
    });

    const formik = useFormik({
        initialValues: {
            category_id: '',
            subcategory_id: '',
            name: '',
            description: '',
            price: '',
            stock: '',
        },
        validationSchema: productSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(updateProduct({ ...values, _id: update }));
            } else {
                //     const newId = new ObjectId()
                //     dispatch(AddProduct({ ...values, _id: newId }));

                const rNo = Math.floor(Math.random() * 1000)
                dispatch(AddProduct({ ...values, _id: rNo }))
            }
            resetForm()
            handleClose()
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, values, touched, setFieldValue } = formik;
    const changeSelect = (event) => {
        setFieldValue("category_id", event.target.value);
        getsubcategorydata(event.target.value);
        setFieldValue("subcategory_id", "");
    };

    const getsubcategorydata = async (category_id) => {
        const response = await fetch(`http://localhost:8000/api/v1/subcategories/get-subcategoryBycategory/${category_id}`);
        const data = await response.json();
        console.log(data.data);
        setSubcategoryData(data.data)
    }

    return (
        <>
            {
                // products.isLoading ? <Spinner>Loading....</Spinner> :
                //     products.error ? <p>{products.error}</p> :
                <>
                    <React.Fragment>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Add Product
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle>Add The Product</DialogTitle>
                            <form onSubmit={handleSubmit}>
                                <DialogContent>
                                    <FormControl fullWidth>
                                        <InputLabel id="category-select-label">Categories</InputLabel>
                                        <Select
                                            labelId="category-select-label"
                                            id="category-select"
                                            value={values.category_id}
                                            label="Category"
                                            name="category_id"
                                            onChange={changeSelect}
                                            onBlur={handleBlur}
                                            error={
                                                errors.category_id && touched.category_id ? true : false
                                            }
                                        >
                                            {categories.map((v) => (
                                                <MenuItem key={v._id} value={v._id}>
                                                    {v.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.category_id && touched.category_id && <span style={{ color: "red" }}>{errors.category_id}</span>}
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="subcategory-select-label">
                                            Select Sub Categories
                                        </InputLabel>
                                        <Select
                                            labelId="subcategory-select-label"
                                            id="subcategory-select"
                                            value={values.subcategory_id}
                                            label="Subcategory"
                                            name="subcategory_id"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                errors.subcategory_id && touched.subcategory_id ? true : false
                                            }
                                        >
                                            {subcategoryData?.length > 0 && subcategoryData && subcategoryData.map((v) => (
                                                console.log(v._id),
                                                (
                                                    <MenuItem key={v._id} value={v._id}>
                                                        {v.name}
                                                        {/* console.log({v.name}); */}
                                                    </MenuItem>
                                                )
                                            )
                                            )}
                                        </Select>
                                        {errors.subcategory_id && touched.subcategory_id && <span style={{ color: "red" }}>{errors.subcategory_id}</span>}
                                    </FormControl>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        error={errors.name && errors.name ? true : false}
                                        helperText={errors.name && touched.name ? errors.name : ''}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="description"
                                        name="description"
                                        label="description"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        error={errors.description && errors.description ? true : false}
                                        helperText={errors.description && touched.description ? errors.description : ''}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="price"
                                        name="price"
                                        label="price"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                        error={errors.price && errors.price ? true : false}
                                        helperText={errors.price && touched.price ? errors.price : ''}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="stock"
                                        name="stock"
                                        label="stock"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.stock}
                                        error={errors.stock && errors.stock ? true : false}
                                        helperText={errors.stock && touched.stock ? errors.stock : ''}
                                    />
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit">{update ? 'update' : 'Add'}</Button>
                                    </DialogActions>
                                </DialogContent>
                            </form>
                        </Dialog>
                    </React.Fragment>
                    <br /><br />
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={products.products}
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
                </>
            }
        </>
    );
}

export default Products;