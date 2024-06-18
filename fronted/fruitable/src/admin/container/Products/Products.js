import React, { useEffect, useState } from 'react';
import {
    Button, TextField, Dialog, DialogActions,
    DialogContent, DialogTitle, FormControl, IconButton,
    InputLabel, MenuItem, OutlinedInput, Select
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
// import { HashLoader } from 'react-spinners';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as yup from 'yup';
import { addproductdata, deleteproductdata, editproductdata, getdata } from '../../../redux/action/products.action';

function Products(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [categoridata, setCategoridata] = useState([]);
    const [subcategoridata, setsubCategoridata] = useState([]);
    const [selectsub, setselectsub] = useState([]);
    const dispatch = useDispatch();

    const product = useSelector(state => state.product.product) || [];

    const getCategoryData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/categories/list-categories");
            const data = await response.json();
            setCategoridata(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getSubcategoryData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/subcategories/list-subcategories");
            const data = await response.json();
            setsubCategoridata(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        dispatch(getdata());
        getCategoryData();
        getSubcategoryData();
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate(false);
        formik.resetForm();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const productSchema = yup.object({
        category_id: yup.string().required("Category is required"),
        subcategory_id: yup.string().required("Subcategory is required"),
        name: yup.string().required("Name is required"),
        description: yup.string().required("Description is required"),
        price: yup.string().required("Price is required"),
        stock: yup.number().required("Stock is required").positive().integer(),
        product_image: yup.mixed()
            .required("Please select an image")
            .test("fileSize", "The file is too large", (value) => {
                if (value.size) {
                    return value && value.size <= 1024 * 1024;
                }
                return true
            })
            .test("fileType", "Unsupported File Format", (value) => {
                if (value.type) {
                    return (
                        value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
                    );
                }
                return true
            }),
    });

    const formik = useFormik({
        initialValues: {
            category_id: '',
            subcategory_id: '',
            name: '',
            description: '',
            price: '',
            stock: '',
            product_image: '',
        },
        validationSchema: productSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(editproductdata(values));
            } else {
                dispatch(addproductdata(values));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleBlur, handleChange, handleSubmit, touched, errors, values, setValues, setFieldValue } = formik;

    const handlecategorichange = async (category_id) => {
        const response = await fetch(`http://localhost:8000/api/v1/subcategories/get-subcategoryBycategory/${category_id}`)
        const data = await response.json();
        setselectsub(data.data);
    };

    const selectchange = (event) => {
        setFieldValue("category_id", event.target.value);
        handlecategorichange(event.target.value);
        setFieldValue("subcategory_id", "");
    };

    const handleDelete = (_id) => {
        dispatch(deleteproductdata(_id));
    };

    const handleEdit = (data) => {
        setUpdate(data._id);
        setOpen(true);
        setValues(data);
        handlecategorichange(data.category_id);
    };

    const columns = [
        {
            field: 'category_id', headerName: 'Category', width: 180,
            renderCell: (params) => {
                const category = categoridata.find((v) => v._id === params.row.category_id);
                return category ? category.name : '';
            }
        },
        {
            field: 'subcategory_id', headerName: 'Subcategory', width: 180,
            renderCell: (params) => {
                const subcategory = subcategoridata.find((v) => v._id === params.row.subcategory_id);
                return subcategory ? subcategory.name : '';
            }
        },
        { field: 'name', headerName: 'Name', width: 140 },
        { field: 'description', headerName: 'Description', width: 120 },
        {
            field: "product_image",
            headerName: "Image",
            width: 150,
            renderCell: (params) => {
                if (params.row.product_image && params.row.product_image.url) {
                    return <img src={params.row.product_image.url
                    } alt={params.row.name} width={50} />;
                } else {
                    return null;
                }
            },
        },
        { field: 'price', headerName: 'Price', width: 90 },
        { field: 'stock', headerName: 'Stock', width: 90 },
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        }
    ];

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250,
            },
        },
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Product
            </Button>
            <br /><br />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Product</DialogTitle>
                <form onSubmit={handleSubmit} method="post" enctype="multipart/form-data" >
                    <DialogContent>
                        <FormControl fullWidth margin="dense">
                            <InputLabel id="category_id-label">--select Category--</InputLabel>
                            <Select
                                labelId="category_id-label"
                                id="category_id"
                                name="category_id"
                                value={values.category_id}
                                onChange={selectchange}
                                input={<OutlinedInput label="select category" />}
                                MenuProps={MenuProps}
                            >
                                {categoridata.map((v) => (
                                    <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                                ))}
                            </Select>
                            {/* {errors.category_id && touched.category_id ? errors.category_id : ''} */}
                            {errors.category_id && touched.category_id && <span style={{ color: "red" }}>{errors.category_id}</span>}
                        </FormControl>
                        <FormControl fullWidth margin="dense">
                            <InputLabel id="subcategory_id-label">--select Subcategory--</InputLabel>
                            <Select
                                labelId="subcategory_id-label"
                                id="subcategory_id"
                                name="subcategory_id"
                                value={values.subcategory_id}
                                onChange={handleChange}
                                input={<OutlinedInput label="select subcategory" />}
                                MenuProps={MenuProps}
                            >
                                {selectsub.map((v) => (
                                    <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                                ))}
                            </Select>
                            {errors.subcategory_id && touched.subcategory_id ? errors.subcategory_id : ''}
                        </FormControl>
                        <input
                            id="product_image"
                            name="product_image"
                            label="product_image"
                            type="file"
                            fullWidth
                            variant="standard"
                            onChange={(event) => {
                                setFieldValue("product_image", event.currentTarget.files[0]);
                            }}
                            onBlur={handleBlur}
                            sx={{ marginBottom: 2 }}
                        />
                        <br></br><br></br>
                        {
                            values.product_image &&
                            <img src={values.product_image.url ? values.product_image.url : URL.createObjectURL(values.product_image)} width={50} />
                        }

                        {/* {
                            values.product_image && (
                                <img src={typeof values.product_image.url === 'string' ? values.product_image.url : URL.createObjectURL(values.product_image)} width={50} alt="Product" />
                            )} */}

                        {errors.product_image && touched.product_image ? <span style={{ color: "red" }}>{errors.product_image}</span> : null}

                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Product Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.description && touched.description}
                            helperText={errors.description && touched.description ? errors.description : ''}
                        />

                        <TextField
                            margin="dense"
                            id="price"
                            name="price"
                            label="Price"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.price && touched.price}
                            helperText={errors.price && touched.price ? errors.price : ''}
                        />
                        <TextField
                            margin="dense"
                            id="stock"
                            name="stock"
                            label="Stock"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={values.stock}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.stock && touched.stock}
                            helperText={errors.stock && touched.stock ? errors.stock : ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">{update ? "Update" : "Add"}</Button>
                    </DialogActions>
                </form>
            </Dialog>
            {product.length > 0 ? (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={product}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        // getRowId={(row) => row._id}
                        getRowId={(row) => row._id}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </div>
            ) : (
                <p>No products available</p>
            )}
        </>
    );
}

export default Products;
