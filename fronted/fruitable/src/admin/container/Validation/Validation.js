import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, mixed, date } from 'yup';
import { useFormik } from 'formik';

function Validation(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let VlidateSchema = object({
        name: string().required('Name is required').max(20, 'Name must be less than 20 characters').min(2, 'Name must be at least 3 characters'),
        email: string().email('Invalid email address').required('Email is required'),
        password: string().min(8, 'Password must be at least 8 characters').required('Password is required').min(8, 'Password must be at least 8 characters').matches(/[a-zA-Z0-9]/, "Password must be alphanumeric").matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special symbol'),
        age: number().min(18, 'You must be at least 18 years old').required('Age is required'),
        appointment_date: date().required('Date is required'),
        message: string().required('Message is required').test('word-count', 'Message must have at most 10 words', value => {

        }),
        file: mixed().required('File is required').test('fileFormat', 'Only PNG files are allowed', value => value && value.type === 'image/png'),
        country: string().required('Country is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            age: '',
            appointment_date: '',
            message: '',
            file: '',
            country: ''
        },
        validationSchema: VlidateSchema,
        onSubmit: values => {
            handleClose();
        },
    });
    const { handleSubmit, handleChange, handleBlur, setFieldValue, errors, touched, values } = formik;

    return (
        <div>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Validation
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Validation</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                            <TextField
                                margin="dense"
                                id="email"
                                name="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <TextField
                                margin="dense"
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                            />
                            <TextField
                                margin="dense"
                                id="age"
                                name="age"
                                label="Age"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.age}
                                error={touched.age && Boolean(errors.age)}
                                helperText={touched.age && errors.age}
                            />
                            <TextField
                                margin="dense"
                                id="appointment_date"
                                name="appointment_date"
                                type="date"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.appointment_date}
                                InputLabelProps={{ shrink: true }}
                                error={touched.appointment_date && Boolean(errors.appointment_date)}
                                helperText={touched.appointment_date && errors.appointment_date}
                            />
                            <TextField
                                margin="dense"
                                id="message"
                                name="message"
                                label="Message"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.message}
                                error={touched.message && Boolean(errors.message)}
                                helperText={touched.message && errors.message}
                            />
                            <input
                                id="file"
                                name="file"
                                type="file"
                                onChange={(event) => {
                                    setFieldValue("file", event.currentTarget.files[0]);
                                }}
                                onBlur={handleBlur}
                            />
                            {touched.file && errors.file && <div style={{ color: 'red' }}>{errors.file}</div>}

                            <TextField
                                margin="dense"
                                id="country"
                                name="country"
                                label="Country"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.country}
                                error={touched.country && Boolean(errors.country)}
                                helperText={touched.country && errors.country}
                            />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">Submit</Button>
                            </DialogActions>
                        </form>

                    </DialogContent>

                </Dialog>
            </React.Fragment>
        </div>
    );
}

export default Validation;