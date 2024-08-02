import React, { useContext, useEffect, useState } from 'react';
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
import { ContectContext } from '../../../Context/ContectContext';

function Contect(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(false)

    const contect = useContext(ContectContext)
    // console.log(contect);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let contectSchema = object({
        address: string().required(),
        email: string().email().required(),
        phone: number().required()

    });

    const formik = useFormik({
        initialValues: {
            address: '',
            email: '',
            phone: '',
        },
        validationSchema: contectSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                contect.updateContect(values)
            } else {
                contect.addContect(values)
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
        contect.deleteContect(id)
    }

    const columns = [
        { field: 'address', headerName: 'Address', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'phone', headerName: 'Phone' },
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
        contect.getContect()
    }, [])

    return (
        <div>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Contect
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Contect</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="address"
                                name="address"
                                label="address"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                error={errors.address && errors.address ? true : false}
                                helperText={errors.address && touched.address ? errors.address : ''}
                            />
                            <TextField
                                margin="dense"
                                id="email"
                                name="email"
                                label="email"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={errors.email && errors.email ? true : false}
                                helperText={errors.email && touched.email ? errors.email : ''}
                            />
                            <TextField
                                margin="dense"
                                id="phone"
                                name="phone"
                                label="phone"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                error={errors.phone && errors.phone ? true : false}
                                helperText={errors.phone && touched.phone ? errors.phone : ''}
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
                    rows={contect.contact}
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

export default Contect;