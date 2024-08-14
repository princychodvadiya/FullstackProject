import React, { useContext, useEffect } from 'react';
import Home from '../user/container/Home/Home';
import Shop from '../user/container/Shop/Shop';
import Contect from '../user/container/Contect/Contect';
import Shopdetails from '../user/container/Shop-details/Shopdetails';
import Cart from '../user/container/Pages/Cart';
import Chackout from '../user/container/Pages/Chackout';
import Error from '../user/container/Pages/Error';
import Header from '../user/component/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Footer from '../user/component/Footer/Footer';
import Testimonial from '../user/container/Pages/Testimonial';
import PrivateRoutes from './PrivateRoutes';
import Review from '../user/container/Review/Review';
import { ThemeContext } from '../Context/ThemeContext';
import Chat from '../user/container/Chat/Chat';
import Login from '../user/container/Login/Login';
import { checkAuth } from '../redux/reducer/slice/login.slice';
import { useDispatch } from 'react-redux';

function UserRoutes(props) {
    const theme = useContext(ThemeContext)
    console.log(theme);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuth())
    }, [])
    
    return (
        <div>
            <div className={theme.theme}>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route element={<PrivateRoutes />} >
                        <Route exact path="/shop" element={<Shop />} />
                        <Route exact path='/shop-details' element={<Shopdetails />} />
                        <Route exact path="/shop/:id" element={<Shopdetails />} />
                    </Route>
                    <Route exact path="/contect" element={<Contect />} />
                    <Route exact path="/pages" />
                    <Route exact path="/cart" element={<Cart />} />
                    <Route exact path="/chackout" element={<Chackout />} />
                    <Route exact path="/tetimonial" element={<Testimonial />} />
                    <Route exact path="/error" element={<Error />} />
                    <Route exact path='/review' element={<Review />} />
                    <Route exact path='/chat' element={<Chat />} />
                    <Route exact path='/login' element={<Login />} />
                </Routes>
                <Footer />
            </div>
        </div>
    );
}

export default UserRoutes;