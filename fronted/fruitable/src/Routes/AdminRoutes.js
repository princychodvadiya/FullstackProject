import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../admin/container/Products/Products';
import Layout from '../admin/component/Layout/Layout';
// import { Reviews } from '@mui/icons-material';
import Reviews from '../admin/container/Reviews/Reviews';
import Counter from '../admin/container/Counter/Counter';
import Facilities from '../admin/container/Facilities/Facilities';
import Coupon from "../admin/container/Coupon/Coupon"
import Contect from '../admin/container/Contect/Contect';
import Category from '../admin/container/Category/Category'
import Subcatagory from '../admin/container/Subcategoty/Subcategoty';
import Validation from '../admin/container/Validation/Validation';
import Variant from '../admin/container/Variant/Variant';

function AdminRoutes(props) {
    return (
        <Layout>
            <Routes>
                <Route exact path='/Product' element={<Products />} />
                <Route exact path='/Review' element={<Reviews />} />
                <Route exact path='/Category' element={<Category />} />
                <Route exact path='/Counter' element={<Counter />} />
                <Route exact path='/Facilities' element={<Facilities />} />
                <Route exact path='/Coupon' element={<Coupon />} />
                <Route exact path='/Contect' element={<Contect />} />
                <Route exact path='/Subcategory' element={<Subcatagory />} />
                <Route exact path='/Validation' element={<Validation />} />
                <Route exact path='/Variant' element={<Variant />} />
            </Routes>
        </Layout>
    );
}

export default AdminRoutes;