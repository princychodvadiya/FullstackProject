import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../../redux/reducer/slice/login.slice';
import { Navigate } from "react-router-dom";
function Login() {
    const [view, setView] = useState('login');
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.login)
    console.log(auth);

    const getValidationSchema = () => {
        switch (view) {
            case 'login':
                return Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Email is required'),
                    password: Yup.string()
                        .required('Password is required')
                        .min(6, 'Password must be at least 6 characters'),
                })

            case 'signUp':
                return Yup.object({
                    name: Yup.string().required('Name is required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Email is required'),
                    password: Yup.string()
                        .required('Password is required')
                        .min(6, 'Password must be at least 6 characters'),
                });
            case 'forgotPassword':
                return Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Email is required'),
                });
            default:
                return Yup.object({});
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: ''
        },
        validationSchema: getValidationSchema(),
        enableReinitialize: true,
        onSubmit: values => {
            if (view === 'signUp') {
                dispatch(register({ ...values, role: 'user' }));
            } else if (view === 'login') {
                dispatch(login(values))
            }
        },
    });

    if (auth.isAuthentication) {
        return <Navigate to="/" />
    }

    const { handleChange, handleBlur, handleSubmit, values, touched, errors } = formik;

    const renderForm = () => {
        switch (view) {
            case 'login':
                return (
                    <>
                        <h6>Email</h6>
                        <input
                            type="email"
                            fullWidth
                            placeholder="Enter your email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.email && errors.email ? <div className="error">{errors.email}</div> : null}
                        <h6>Password</h6>
                        <input
                            type="password"
                            fullWidth
                            placeholder="Enter your password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.password && errors.password ? <div className="error">{errors.password}</div> : null}
                        <button type="submit" className="btn btn-primary w-100 mt-4">Login</button>
                    </>
                );
            case 'signUp':
                return (
                    <>
                        <h6>Name</h6>
                        <input
                            type="text"
                            fullWidth
                            placeholder="Enter your name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.name && errors.name ? <div className="error">{errors.name}</div> : null}
                        <h6>Email</h6>
                        <input
                            fullWidth
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.email && errors.email ? <div className="error">{errors.email}</div> : null}
                        <h6>Password</h6>
                        <input
                            type="password"
                            fullWidth
                            placeholder="Enter your password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.password && errors.password ? <div className="error">{errors.password}</div> : null}
                        <button type="submit" className="btn btn-primary w-100 mt-4">Sign Up</button>
                    </>
                );
            case 'forgotPassword':
                return (
                    <>
                        <h6>Email</h6>
                        <input
                            fullWidth
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.email && errors.email ? <div className="error">{errors.email}</div> : null}
                        <button type="submit" className="btn btn-primary w-100 mt-4">Reset Password</button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">
                                {view === 'login' ? 'Login' : view === 'signUp' ? 'Sign Up' : 'Forgot Password'}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                {renderForm()}
                            </form>
                            <div className="text-center mt-3">
                                {view === 'login' && (
                                    <>
                                        <button className="btn btn-link" onClick={() => setView('signUp')}>Sign Up</button>
                                        <button className="btn btn-link" onClick={() => setView('forgotPassword')}>Forgot Password?</button>
                                    </>
                                )}
                                {view === 'signUp' && (
                                    <>
                                        <button className="btn btn-link" onClick={() => setView('login')}>Login</button>
                                    </>
                                )}
                                {view === 'forgotPassword' && (
                                    <>
                                        <button className="btn btn-link" onClick={() => setView('login')}>Back to Login</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
