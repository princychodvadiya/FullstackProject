import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Box, Container, Paper } from '@mui/material';

const validationSchemas = {
    login: Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    }),
    signup: Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    }),
    forgot: Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    }),
};

const Login = () => {
    const [form, setForm] = useState('login'); 

    const handleSubmit = (values, { setSubmitting }) => {
        // Handle form submission here
        console.log('Form submitted:', values);
        setSubmitting(false);
    };

    const renderForm = () => {
        switch (form) {
            case 'signup':
                return (
                    <Formik
                        initialValues={{ email: '', password: '', confirmPassword: '' }}
                        validationSchema={validationSchemas.signup}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Typography variant="h5" gutterBottom>Sign Up</Typography>
                                <Box mb={2}>
                                    <Field
                                        name="email"
                                        as={TextField}
                                        label="Email"
                                        fullWidth
                                        variant="outlined"
                                        helperText={<ErrorMessage name="email" />}
                                        error={Boolean(<ErrorMessage name="email" />)}
                                    />
                                </Box>
                                <Box mb={2}>
                                    <Field
                                        name="password"
                                        as={TextField}
                                        type="password"
                                        label="Password"
                                        fullWidth
                                        variant="outlined"
                                        helperText={<ErrorMessage name="password" />}
                                        error={Boolean(<ErrorMessage name="password" />)}
                                    />
                                </Box>
                                <Box mb={2}>
                                    <Field
                                        name="confirmPassword"
                                        as={TextField}
                                        type="password"
                                        label="Confirm Password"
                                        fullWidth
                                        variant="outlined"
                                        helperText={<ErrorMessage name="confirmPassword" />}
                                        error={Boolean(<ErrorMessage name="confirmPassword" />)}
                                    />
                                </Box>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    fullWidth
                                >
                                    Sign Up
                                </Button>
                            </Form>
                        )}
                    </Formik>
                );

            case 'forgot':
                return (
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={validationSchemas.forgot}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Typography variant="h5" gutterBottom>Forgot Password</Typography>
                                <Box mb={2}>
                                    <Field
                                        name="email"
                                        as={TextField}
                                        label="Email"
                                        fullWidth
                                        variant="outlined"
                                        helperText={<ErrorMessage name="email" />}
                                        error={Boolean(<ErrorMessage name="email" />)}
                                    />
                                </Box>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    fullWidth
                                >
                                    Send Reset Link
                                </Button>
                            </Form>
                        )}
                    </Formik>
                );

            default:
                return (
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchemas.login}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Typography variant="h5" gutterBottom>Login</Typography>
                                <Box mb={2}>
                                    <Field
                                        name="email"
                                        as={TextField}
                                        label="Email"
                                        fullWidth
                                        variant="outlined"
                                        helperText={<ErrorMessage name="email" />}
                                        error={Boolean(<ErrorMessage name="email" />)}
                                    />
                                </Box>
                                <Box mb={2}>
                                    <Field
                                        name="password"
                                        as={TextField}
                                        type="password"
                                        label="Password"
                                        fullWidth
                                        variant="outlined"
                                        helperText={<ErrorMessage name="password" />}
                                        error={Boolean(<ErrorMessage name="password" />)}
                                    />
                                </Box>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    fullWidth
                                >
                                    Login
                                </Button>
                            </Form>
                        )}
                    </Formik>
                );
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: '100%' }}>
                    {renderForm()}
                    <Box mt={2} display="flex" >
                        <Button onClick={() => setForm('login')}>Login</Button>
                        <Button onClick={() => setForm('signup')} >Sign Up</Button>
                        <Button onClick={() => setForm('forgot')} >Forgot Password</Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
