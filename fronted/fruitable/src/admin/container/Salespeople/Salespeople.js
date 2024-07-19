import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string, number, date } from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addSalespeople, deleteSalespeople, getSalespeople, updateSalespeople } from '../../../redux/action/salespeople.action';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Switch } from '@mui/material';
import { FormControlLabel, styled } from '@mui/material';

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
        comm: number().required(),
        isActive: string().required("Please enter isActive"),
    });

    const formik = useFormik({
        initialValues: {
            sname: '',
            city: '',
            comm: '',
            isActive: 1,
        },
        validationSchema: SalespeopleSchema,
        onSubmit: (values, { resetForm }) => {
            // values.isActive = values.isActive === '1' ? true : false;
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
            field: 'isActive', headerName: 'Status', width: 80, renderCell: (params) => (
                // <Android12Switch
                //     checked={params.row.isActive}
                // />
                <Switch checked={params.row.isActive} />
            )
        },
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

    // const Android12Switch = styled(Switch)(({ theme }) => ({
    //     padding: 8,
    //     '& .MuiSwitch-track': {
    //         borderRadius: 22 / 2,
    //         '&::before, &::after': {
    //             content: '""',
    //             position: 'absolute',
    //             top: '50%',
    //             transform: 'translateY(-50%)',
    //             width: 16,
    //             height: 16,
    //         },
    //         '&::before': {
    //             backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
    //                 theme.palette.getContrastText(theme.palette.primary.main),
    //             )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
    //             left: 12,
    //         },
    //         '&::after': {
    //             backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
    //                 theme.palette.getContrastText(theme.palette.primary.main),
    //             )}" d="M19,13H5V11H19V13Z" /></svg>')`,
    //             right: 12,
    //         },
    //     },
    //     '& .MuiSwitch-thumb': {
    //         boxShadow: 'none',
    //         width: 16,
    //         height: 16,
    //         margin: 2,
    //     },
    // }));
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

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
                        {/* <FormControlLabel
                            name='isActive'
                            control={
                                <Android12Switch
                                    checked={values.isActive === 1}
                                    onChange={() => formik.setFieldValue('isActive', values.isActive === 1 ? 0 : 1)}
                                />
                            }
                            label="isActive"
                        /> */}
                        <div> <Switch
                            checked={values.isActive === 1}
                            name='isActive'
                            onChange={() => formik.setFieldValue('isActive', values.isActive === 1 ? 0 : 1)}
                            {...label} defaultChecked /></div>
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
