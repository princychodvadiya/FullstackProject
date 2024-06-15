// import React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { object, string, number, mixed, date } from 'yup';
// import { useFormik } from 'formik';

// function Validation(props) {
//     const [open, setOpen] = React.useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     let VlidateSchema = object({
//         name:
//             string()
//                 .required('Name is required')
//                 .max(20, 'Name must be less than 20 characters')
//                 .min(2, 'Name must be at least 3 characters'),
//         email:
//             string()
//                 .email('Invalid email address')
//                 .required('Email is required'),
//         password:
//             string()
//                 .min(8, 'Password must be at least 8 characters')
//                 .required('Password is required')
//                 .min(8, 'Password must be at least 8 characters').matches(/[a-zA-Z0-9]/, "Password must be alphanumeric").matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special symbol'),
//         age: number().min(18, 'You must be at least 18 years old').required('Age is required'),
//         appointment_date: date().required('Date is required'),
//         message: string().required('Message is required').test('word-count', 'Message must have at most 10 words', value => {

//         }),
//         file: mixed().required('File is required').test('fileFormat', 'Only PNG files are allowed', value => value && value.type === 'image/png'),
//         country: string().required('Country is required'),
//     });

//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             email: '',
//             password: '',
//             age: '',
//             appointment_date: '',
//             message: '',
//             file: '',
//             country: ''
//         },
//         validationSchema: VlidateSchema,
//         onSubmit: values => {
//             handleClose();
//         },
//     });
//     const { handleSubmit, handleChange, handleBlur, setFieldValue, errors, touched, values } = formik;

//     return (
//         <div>
//             <React.Fragment>
//                 <Button variant="outlined" onClick={handleClickOpen}>
//                     Validation
//                 </Button>
//                 <Dialog
//                     open={open}
//                     onClose={handleClose}
//                 >
//                     <DialogTitle>Validation</DialogTitle>
//                     <DialogContent>
//                         <form onSubmit={handleSubmit}>
//                             <TextField
//                                 autoFocus
//                                 margin="dense"
//                                 id="name"
//                                 name="name"
//                                 label="Name"
//                                 type="text"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.name}
//                                 error={touched.name && Boolean(errors.name)}
//                                 helperText={touched.name && errors.name}
//                             />
//                             <TextField
//                                 margin="dense"
//                                 id="email"
//                                 name="email"
//                                 label="Email Address"
//                                 type="email"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.email}
//                                 error={touched.email && Boolean(errors.email)}
//                                 helperText={touched.email && errors.email}
//                             />
//                             <TextField
//                                 margin="dense"
//                                 id="password"
//                                 name="password"
//                                 label="Password"
//                                 type="password"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.password}
//                                 error={touched.password && Boolean(errors.password)}
//                                 helperText={touched.password && errors.password}
//                             />
//                             <TextField
//                                 margin="dense"
//                                 id="age"
//                                 name="age"
//                                 label="Age"
//                                 type="number"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.age}
//                                 error={touched.age && Boolean(errors.age)}
//                                 helperText={touched.age && errors.age}
//                             />
//                             <TextField
//                                 margin="dense"
//                                 id="appointment_date"
//                                 name="appointment_date"
//                                 type="date"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.appointment_date}
//                                 InputLabelProps={{ shrink: true }}
//                                 error={touched.appointment_date && Boolean(errors.appointment_date)}
//                                 helperText={touched.appointment_date && errors.appointment_date}
//                             />
//                             <TextField
//                                 margin="dense"
//                                 id="message"
//                                 name="message"
//                                 label="Message"
//                                 type="text"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.message}
//                                 error={touched.message && Boolean(errors.message)}
//                                 helperText={touched.message && errors.message}
//                             />
//                             <input
//                                 id="file"
//                                 name="file"
//                                 type="file"
//                                 onChange={(event) => {
//                                     setFieldValue("file", event.currentTarget.files[0]);
//                                 }}
//                                 onBlur={handleBlur}
//                             />
//                             {touched.file && errors.file && <div style={{ color: 'red' }}>{errors.file}</div>}

//                             <TextField
//                                 margin="dense"
//                                 id="country"
//                                 name="country"
//                                 label="Country"
//                                 type="text"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.country}
//                                 error={touched.country && Boolean(errors.country)}
//                                 helperText={touched.country && errors.country}
//                             />
//                             <DialogActions>
//                                 <Button onClick={handleClose}>Cancel</Button>
//                                 <Button type="submit">Submit</Button>
//                             </DialogActions>
//                         </form>

//                     </DialogContent>

//                 </Dialog>
//             </React.Fragment>
//         </div>
//     );
// }

// export default Validation;

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useFormik } from 'formik';
import * as Yup from "yup";
import {
    MenuItem,
    Select,
    FormControl,
    FormControlLabel,
    Checkbox,
    FormLabel,
    Radio,
    RadioGroup,
    FormHelperText,
} from "@mui/material";

function Validation() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let d = new Date();
    console.log(d);
    d.setDate(d.getDate() - 1);

    const hobbiesList = ["Reading", "Traveling", "Gaming", "Cooking"];

    const SignupSchema = Yup.object().shape({
        name: Yup
            .string()
            .required()
            .matches(/^[a-zA-Z ]{2,30}$/, "Name is required"),
        email: Yup
            .string()
            .required("please enter valid email address."),
        phone: Yup
            .string()
            .min(8)
            .max(10)
            .required("please enter valid phone number"),
        date: Yup
            .date()
            .min(d, "plase enter valid date.")
            .required(),
        select: Yup
            .string()
            .required("please select an option"),
        file: Yup
            .mixed()
            .required("Please upload a file")
            .test(
                "fileSize",
                "File size is too large (max 2MB)",
                value => !value || (value && value.size <= 1024 * 1024 * 2))
            .test(
                "fileType",
                "Unsupported file type",
                file => !file || (file && ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'].includes(file.type))),
        message: Yup.string()
            .required("Message is required")
            .test("space", "only one space is allowed", (val) => {
                return !val.includes("  ");
            })
            .test("minWords", "Message must contain at least 10 words", (value) => {
                return value ? value.split(" ").length >= 5 : false;
            }),
        gender: Yup.string().required(),
        hobbies: Yup.array()
            .min(3, "Please select at least three hobby")
            .required("Please select your hobbies"),

    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            date: '',
            select: '',
            file: '',
            message: '',
            gender: '',
            hobbies: ''
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    const { handleChange, handleBlur, handleSubmit, errors, values, touched, setValues, setFieldValue } = formik;


    const handleHobbiesChange = (event) => {
        const { value } = event.target;
        const currentIndex = values.hobbies.indexOf(value);
        const newHobbies = [...values.hobbies];

        if (currentIndex === -1) {
            newHobbies.push(value);
        } else {
            newHobbies.splice(currentIndex, 1);
        }
        setFieldValue("hobbies", newHobbies);
    };

    return (
        <>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>Open form dialog</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="name"
                                type="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                fullWidth
                                values={values.name}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                            <TextField
                                margin="dense"
                                id="email"
                                name="email"
                                label="email"
                                type="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                fullWidth
                                values={values.email}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <TextField
                                margin="dense"
                                id="phone"
                                name="phone"
                                label="phone"
                                type="phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                fullWidth
                                values={values.phone}
                                error={touched.phone && Boolean(errors.phone)}
                                helperText={touched.phone && errors.phone}
                            />
                            <TextField
                                margin="dense"
                                id="date"
                                name="date"
                                type="date"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                fullWidth
                                values={values.date}
                                error={touched.date && Boolean(errors.date)}
                                helperText={touched.date && errors.date}
                            />
                            <select
                                margin="dense"
                                fullWidth
                                id="select"
                                name="select"
                                value={values.select}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                values={values.select}
                                error={touched.select && errors.select}
                                helperText={touched.select && errors.select ? errors.select : ""}
                            >
                                <option value="0" >--Select Option--</option>
                                <option value="1" >select 1</option>
                                <option value="2" >select 2</option>
                                <option value="3" >select 3</option>
                            </select>
                            <TextField
                                margin="dense"
                                id="file"
                                name="file"
                                type="file"
                                onBlur={handleBlur}
                                onChange={(event) => {
                                    setFieldValue("file", event.currentTarget.files[0])
                                }}
                                fullWidth
                                values={values.file}
                                error={touched.file && Boolean(errors.file)}
                                helperText={touched.file && errors.file}
                            />
                            <TextField
                                margin="dense"
                                id="message"
                                name="message"
                                type="message"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                fullWidth
                                label="message"
                                values={values.message}
                                error={touched.message && Boolean(errors.message)}
                                helperText={touched.message && errors.message}
                            />
                            <FormControl
                                margin="dense"
                                fullWidth
                                error={touched.gender && Boolean(errors.gender)}
                            >
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup
                                    name="gender"
                                    value={values.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                    />
                                </RadioGroup>
                                {touched.gender && (
                                    <FormHelperText>{errors.gender}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl
                                margin="dense"
                                fullWidth
                                error={touched.hobbies && Boolean(errors.hobbies)}
                            >
                                <FormLabel>Hobbies</FormLabel>
                                {hobbiesList.map((hobby) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value={hobby}
                                                checked={values.hobbies.includes(hobby)}
                                                // checked={values.hobbies.includes(hobby)}
                                                onChange={handleHobbiesChange}
                                                onBlur={handleBlur}
                                            />
                                        }
                                        label={hobby}
                                        key={hobby}
                                    />
                                ))}
                                {touched.hobbies && (
                                    <FormHelperText>{errors.hobbies}</FormHelperText>
                                )}
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
        </>
    )
}
export default Validation;