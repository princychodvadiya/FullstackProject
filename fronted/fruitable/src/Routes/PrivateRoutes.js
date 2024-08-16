import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { checkAuth } from '../redux/reducer/slice/login.slice';

function PrivateRoutes(props) {
    // const auth = true;
    const [loading, setLoading] = useState(true)
    const { isAuthentication } = useSelector((state) => state.login)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        const chackAuthState = async () => {
            try {
                await dispatch(checkAuth())
            } catch (error) {
                navigate("/login")
            } finally {
                setLoading(false)
            }
        }
        chackAuthState();
    }, [dispatch, navigate])

    if (loading) {
        return <div>Loading.....</div>
    }

    return (
        isAuthentication ? <Outlet /> : <Navigate to={'/login'} replace />
    );
}

export default PrivateRoutes;