import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object } from 'yup';
import * as yup from 'yup';
import Products from '../Products/Products';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useDispatch } from 'react-redux';

function Variant(props) {
    const [open, setOpen] = React.useState(false);
    const [selectsub, setselectsub] = useState([]);
    const [categoridata, setCategoridata] = useState([]);
    const dispatch = useDispatch();
    const [subcategoridata, setsubCategoridata] = useState([]);
    const [product, setProduct] = useState([]);
    const [selectproduct, setselectproduct] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let variantSchema = object({
        category_id: yup.string().required("Category is required"),
        subcategory_id: yup.string().required("Subcategory is required"),
        product_id: yup.string().required("Product is required"),
        price: yup.string().required("Price is required"),
        quantity: yup.string().required(),
        discount: yup.string().required()
    });

    const formik = useFormik({
        initialValues: {
            category_id: '',
            subcategory_id: '',
            product_id: '',
            price: '',
            quantity: '',
            discount: '',
        },
        validationSchema: variantSchema,
        onSubmit: values => {

        },
    });

    const { handleBlur, handleChange, handleSubmit, touched, errors, values, setValues, setFieldValue } = formik;

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250,
            },
        },
    };



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
        getCategoryData();
        getSubcategoryData();
    }, [dispatch]);

    const hendelCategoryChage = async (category_id) => {
        const response = await fetch(`http://localhost:8000/api/v1/subcategories/get-subcategoryBycategory/${category_id}`)
        const data = await response.json();
        setselectproduct(data.data)
    }

    const selectchange = (event) => {
        setFieldValue("category_id", event.target.value);
        hendelCategoryChage(event.target.value);
        setFieldValue("subcategory_id", "");
        setFieldValue("product_id", '')
    };


    const handleProductChange = async (subcategory_id) => {
        console.log("ok");
        const response = await fetch(`http://localhost:8000/api/v1/products/get-ProductBySubcategory/${subcategory_id}`)
        const data = await response.json();
        // console.log(data);
        setselectsub(data.data);
    };

    const changPro = (event) => {
        setFieldValue("subcategory_id", event.target.value);
        handleProductChange(event.target.value);
        setFieldValue("product_id", '')
    }
    return (
        <div>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    ADD VARIANTS
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Variant</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
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
                                    onChange={changPro}
                                    input={<OutlinedInput label="select subcategory" />}
                                    MenuProps={MenuProps}
                                >
                                    {selectsub.map((v) => (
                                        <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                                    ))}
                                </Select>
                                {errors.subcategory_id && touched.subcategory_id && <span style={{ color: "red" }}>{errors.subcategory_id}</span>}
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="product_id-label">--select product--</InputLabel>
                                <Select
                                    labelId="product_id-label"
                                    id="product_id"
                                    name="product_id"
                                    value={values.product_id}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="select product" />}
                                    MenuProps={MenuProps}
                                >
                                    {product.map((v) => (
                                        <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                                    ))}
                                </Select>
                                {errors.product_id && touched.product_id && <span style={{ color: "red" }}>{errors.product_id}</span>}
                            </FormControl>
                            <TextField
                                margin="dense"
                                id="price"
                                name="price"
                                label="price"
                                type="price"
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
                                id="quantity"
                                name="quantity"
                                label="quantity"
                                type="quantity"
                                fullWidth
                                variant="standard"
                                value={values.quantity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.quantity && touched.quantity}
                                helperText={errors.quantity && touched.quantity ? errors.quantity : ''}
                            />
                            <TextField
                                margin="dense"
                                id="discount"
                                name="discount"
                                label="discount"
                                type="discount"
                                fullWidth
                                variant="standard"
                                value={values.discount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.discount && touched.discount}
                                helperText={errors.discount && touched.discount ? errors.discount : ''}
                            />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">ADD</Button>
                            </DialogActions>
                        </form>
                    </DialogContent>

                </Dialog>
            </React.Fragment>
        </div>
    );
}

export default Variant;