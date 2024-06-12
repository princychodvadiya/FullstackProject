import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { ForkRight } from '@mui/icons-material';
import axios from 'axios';
import { ReviewContext } from '../../../Context/ReviewContext';

function Reviews(props) {
    const [open, setOpen] = React.useState(false);
    const [review, setReview] = useState();

    // const reviews = useContext(ReviewContext)
    // console.log(reviews);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'review', headerName: 'Review', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
    ];

    const rows = [

    ];

    let reviewSchema = object({
        name: string().required(),
        review: string().required(),
        email: string().required()
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            review: '',
            email: ''
        },
        validationSchema: reviewSchema,
        onSubmit: (values, { resetForm }) => {
            axios.post('http://localhost:8000/review', values)
                .then((Response) => {
                    console.log(Response.data);
                    setReview(Response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
            resetForm()
            handleClose()
        },
    });

    const { handleBlur, handleChange, handleSubmit, errors, touched, values } = formik

    useEffect(() => {
        axios.get('http://localhost:8000/review')
            .then(Response => {
                console.log(Response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <div>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    add reviews
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Review</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Enter Name"
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
                                id="review"
                                name="review"
                                label="Enter Review"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.review}
                                error={errors.review && errors.review ? true : false}
                                helperText={errors.review && touched.review ? errors.review : ''}
                            />
                            <TextField
                                margin="dense"
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={errors.email && errors.email ? true : false}
                                helperText={errors.email && touched.email ? errors.email : ''}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">add</Button>
                        </DialogActions>
                    </form>


                </Dialog>
            </React.Fragment>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
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

export default Reviews;