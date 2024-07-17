import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string, number } from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addSalespeople, deleteSalespeople, getSalespeople, updateSalespeople } from '../../../redux/action/salespeople.action';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
function Salespeople(props) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [update, setUpdate] = useState(null);
    const salespeople = useSelector(state => state.salespeople);
    console.log(salespeople);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };

    let SalespeopleSchema = object({
        sname: string().required(),
        city: string().required(),
        comm: number().required()
    });

    const formik = useFormik({
        initialValues: {
            sname: '',
            city: '',
            comm: '',
        },
        validationSchema: SalespeopleSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(updateSalespeople(values));
            } else {
                dispatch(addSalespeople(values));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleChange, handleBlur, handleSubmit, touched, errors, values, setValues } = formik;

    const handleEdit = (data) => {
        setUpdate(data.snum);
        setOpen(true);
        setValues(data);
    }

    const handleDelete = (snum) => {
        dispatch(deleteSalespeople(snum));
    }

    const columns = [
        { field: 'sname', headerName: 'Sname', width: 130 },
        { field: 'city', headerName: 'City', width: 130 },
        { field: 'comm', headerName: 'Commission', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.snum)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        }
    ];

    useEffect(() => {
        dispatch(getSalespeople());
    }, [dispatch]);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                ADD Salespeople
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Salespeople</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="sname"
                            name="sname"
                            label="Salespeople Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.sname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.sname && touched.sname}
                            helperText={errors.sname && touched.sname ? errors.sname : ''}
                        />
                        <TextField
                            margin="dense"
                            id="city"
                            name="city"
                            label="City"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.city && touched.city}
                            helperText={errors.city && touched.city ? errors.city : ''}
                        />
                        <TextField
                            margin="dense"
                            id="comm"
                            name="comm"
                            label="Commission"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={values.comm}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.comm && touched.comm}
                            helperText={errors.comm && touched.comm ? errors.comm : ''}
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
                    rows={salespeople.salespeople}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    checkboxSelection
                    getRowId={(row) => row.snum}
                    pagination
                    autoHeight
                />
            </div>
        </div>
    );
}

export default Salespeople;
