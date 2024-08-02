import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AddFacilities, deleteFacilities, updateFacilities } from '../../../redux/action/facilities.action';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import { Spinner } from 'reactstrap';


function Facilities(props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const facilities = useSelector(state => state.facilities);
    const [update, setupdate] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
        setupdate(false)
        formik.resetForm()
    };

    const handleClose = () => {
        setOpen(false);
    };

    let facilitieSchema = object({
        facilities: string().required(),
        description: string().required()
    });

    const formik = useFormik({
        initialValues: {
            facilities: '',
            description: ''
        },
        validationSchema: facilitieSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(updateFacilities(values))
            } else {
                const rNo = Math.floor(Math.random() * 1000)
                dispatch(AddFacilities({ ...values, id: rNo }))
            }

            resetForm()
            handleClose();
        },
    });
    const { handleBlur, handleChange, handleSubmit, errors, touched, values } = formik

    const handelDelete = (id) => {
        // console.log(id);
        dispatch(deleteFacilities(id))
    }

    const handelEdit = (data) => {
        formik.setValues(data)
        setOpen(true);
        setupdate(data)
    }
    const columns = [
        { field: 'facilities', headerName: ' Facilities Name', width: 160 },
        { field: 'description', headerName: 'Facilities Description', width: 160 },
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

    return (
        <>
            {
                facilities.isLoading ? <p>
                    <Spinner>
                        Loading...
                    </Spinner></p> :
                    <>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            add Facilities
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle>Facilities</DialogTitle>
                            <form onSubmit={handleSubmit}>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="facilities"
                                        label="Facilities name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.facilities}
                                        error={errors.facilities && errors.facilities ? true : false}
                                        helperText={errors.facilities && touched.facilities ? errors.facilities : ''}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="description"
                                        label="Facilities description"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        error={errors.description && errors.description ? true : false}
                                        helperText={errors.description && touched.description ? errors.description : ''}
                                    />
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit">{update ? 'update' : 'add'}</Button>
                                    </DialogActions>
                                </DialogContent>
                            </form>
                        </Dialog>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={facilities.facilities}
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
                    </>
            }

        </>
    );
}

export default Facilities;