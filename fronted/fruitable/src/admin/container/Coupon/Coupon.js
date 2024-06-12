import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { AddCoupon, DeleteCoupon, EditCoupon, GetCoupon } from '../../../redux/reducer/slice/coupon.slice';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Coupon(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(false)
    const dispatch = useDispatch()

    const coupon = useSelector(state => state.coupon)
    console.log(coupon);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let couponSchema = object({
        couponCode: string().required(),
        discount: number().required(),
        expiryDate: date().required()

    });

    const formik = useFormik({
        initialValues: {
            couponCode: '',
            discount: '',
            expiryDate: '',
        },
        validationSchema: couponSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(EditCoupon(values))
            } else {
                const rNo = Math.floor(Math.random() * 1000)
                dispatch(AddCoupon(values))

            }
            resetForm()
            handleClose();
        },
    });

    const { handleBlur, handleChange, handleSubmit, errors, touched, values } = formik

    const handelEdit = (data) => {
        formik.setValues(data)
        setOpen(true);
        setupdate(data)
    }

    const handelDelete = (id) => {
        dispatch(DeleteCoupon(id))
    }

    const columns = [
        { field: 'couponCode', headerName: 'Coupon Code', width: 130 },
        { field: 'discount', headerName: 'Discount', width: 130 },
        { field: 'expiryDate', headerName: 'Expiry Date' },
        {
            field: 'action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handelEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handelDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    useEffect(() => {
        dispatch(GetCoupon())
    }, [])

    return (
        <div>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Coupon Code
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Subscribe</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="couponCode"
                                name="couponCode"
                                label="Coupon Code"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.couponCode}
                                error={errors.couponCode && errors.couponCode ? true : false}
                                helperText={errors.couponCode && touched.couponCode ? errors.couponCode : ''}
                            />
                            <TextField
                                margin="dense"
                                id="discount"
                                name="discount"
                                label="Discount"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.discount}
                                error={errors.discount && errors.discount ? true : false}
                                helperText={errors.discount && touched.discount ? errors.discount : ''}
                            />
                            <TextField
                                margin="dense"
                                id="expiryDate"
                                name="expiryDate"
                                // label="Dxpiry Date"
                                type="date"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.expiryDate}
                                error={errors.expiryDate && errors.expiryDate ? true : false}
                                helperText={errors.expiryDate && touched.expiryDate ? errors.expiryDate : ''}
                            />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">{update ? 'update' : 'add'}</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>
                </Dialog>
            </React.Fragment>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={coupon.coupon}
                    columns={columns}
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

export default Coupon;