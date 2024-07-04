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
import { FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getdata } from '../../../redux/action/products.action';
import { getCategory } from '../../../redux/action/category.action';
import { getsubcategory } from '../../../redux/reducer/slice/subcategory.slice';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getVariantData, handleAdd, handleRemove, handleUpdateData } from '../../../redux/reducer/slice/variant.silce';
function Variant(props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [update, setUpdate] = useState(false);
    const [dynamicFields, setDynamicFields] = useState([]);

    const products = useSelector(state => state.product.product);
    const subcategories = useSelector(state => state.subcategory.subcategory);
    const categories = useSelector(state => state.category.category);
    const variant = useSelector(state => state.variants.variants);
    console.log(variant);

    useEffect(() => {
        dispatch(getdata());
        dispatch(getCategory());
        dispatch(getsubcategory());
        dispatch(getVariantData())
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setDynamicFields([]);
    };

    let variantSchema = object({
        category_id: yup.string().required("Category is required"),
        subcategory_id: yup.string().required("Subcategory is required"),
        product_id: yup.string().required("Product is required"),
        price: yup.string().required("Price is required"),
        quantity: yup.string().required(),
        discount: yup.string().required(),
        name: yup.string().required("Name is required"),
        description: yup.string().required("Description is required"),
    });

    const formik = useFormik({
        initialValues: {
            category_id: '',
            subcategory_id: '',
            name: '',
            product_id: '',
            price: '',
            quantity: '',
            discount: '',
            additionalFields: [],
            description: '',
        },
        validationSchema: variantSchema,
        onSubmit: (values, { resetForm }) => {
            const attributes = values.additionalFields.reduce((acc, field) => {
                acc[field.key] = field.value;
                console.log(acc);
                console.log(field);
                return acc;
            });

            console.log(attributes);

            const variantData = {
                ...values,
                attributes,
            };

            if (update) {
                dispatch(handleUpdateData(variantData));
            } else {
                dispatch(handleAdd(variantData));
            }
            resetForm();
            handleClose();
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

    const handleEdit = (data) => {
        formik.setValues({
            ...data,
            additionalFields: Object.entries(data.attributes).map(([key, value]) => ({ key, value })),
        });
        setOpen(true);
        setUpdate(true);
        setDynamicFields(Object.entries(data.attributes).map(([key, value]) => ({ key, value })));
    };

    const handleDelete = (id) => {
        dispatch(handleRemove(id));
    };

    const addField = () => {
        const newField = { key: '', value: '' };
        setDynamicFields([...dynamicFields, newField]);
        setFieldValue('additionalFields', [...dynamicFields, newField]);
    };

    const removeField = (index) => {
        const updatedFields = [...dynamicFields];
        updatedFields.splice(index, 1);
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    const handleDynamicFieldChange = (index, field) => (e) => {
        const updatedFields = [...dynamicFields];
        updatedFields[index][field] = e.target.value;
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };
    const columns = [
        // { field: 'is_active', headerName: 'Active', width: 90, renderCell: (params) => (params.value ? 'Yes' : 'No') },
        {
            field: 'category_id', headerName: 'Category', width: 130,
            renderCell: (params) => {
                const category = categories.find((v) => v._id === params.row.category_id);
                return category ? category.name : '';
            }
        },
        {
            field: 'subcategory_id', headerName: 'Subcategory', width: 130,
            renderCell: (params) => {
                const subcategory = subcategories.find((v) => v._id === params.row.subcategory_id);
                return subcategory ? subcategory.name : '';
            }
        },
        {
            field: 'product_id', headerName: 'Product', width: 130,
            renderCell: (params) => {
                const product = products.find((v) => v._id === params.row.product_id);
                return product ? product.name : '';
            }
        },
        {
            field: 'attributes', headerName: 'Attributes', width: 400,
            renderCell: (params) => {
                const attributes = params.row.attributes;
                return attributes ? Object.entries(attributes).map(([key, value]) => `${key}: ${value}`).join(', ') : '';
            }
        },
        {
            field: 'Action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            ),
        },
    ];

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
                                <InputLabel id="category-select-label">Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    name="category_id"
                                    value={values.category_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {categories.map((v) => (
                                        <MenuItem key={v._id} value={v._id}>
                                            {v.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.category_id && errors.category_id ? (
                                    <div>{errors.category_id}</div>
                                ) : null}
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
                                <Select
                                    labelId="subcategory-select-label"
                                    id="subcategory-select"
                                    name="subcategory_id"
                                    value={values.subcategory_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {
                                        subcategories.filter((v) => v.category_id === values.category_id)
                                            .map((v) => (
                                                <MenuItem key={v._id} value={v._id}>
                                                    {v.name}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                                {touched.subcategory_id && errors.subcategory_id ? (
                                    <div>{errors.subcategory_id}</div>
                                ) : null}
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="product-select-label">Product</InputLabel>
                                <Select
                                    labelId="product-select-label"
                                    id="product-select"
                                    name="product_id"
                                    value={values.product_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {
                                        products.filter((v) => v.subcategory_id === values.subcategory_id)
                                            .map((v) => (
                                                <MenuItem key={v._id} value={v._id}>
                                                    {v.name}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                                {touched.product_id && errors.product_id ? (
                                    <div>{errors.product_id}</div>
                                ) : null}
                            </FormControl>
                            <div>
                                {dynamicFields.map((f, i) => (
                                    <div key={i} >
                                        <TextField
                                            margin="dense"
                                            id={`additionalFields[${i}].key`}
                                            name={`additionalFields[${i}].key`}
                                            label="Key"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onChange={handleDynamicFieldChange(i, 'key')}
                                            value={f.key}
                                        />
                                        <TextField
                                            margin="dense"
                                            id={`additionalFields[${i}].value`}
                                            name={`additionalFields[${i}].value`}
                                            label="Value"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onChange={handleDynamicFieldChange(i, 'value')}
                                            value={f.value}
                                        />
                                        <IconButton onClick={() => removeField(i)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                ))}
                                <Button variant="outlined" onClick={addField}>
                                    Add Field
                                </Button>
                            </div>

                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="name"
                                type="name"
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
                                label="description"
                                type="description"
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
                                <Button type="submit"> {update ? 'Update' : 'Add'}</Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={variant}
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>

        </div>
    );
}

export default Variant;