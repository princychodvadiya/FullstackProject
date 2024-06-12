import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getdata } from '../../../redux/action/products.action';
import { Decrement_cart, Icrement_cart, Remove_cartData } from '../../../redux/reducer/slice/cart.silce';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { GetCoupon } from '../../../redux/reducer/slice/coupon.slice';

function Cart(props) {

    const [discount, setdiscount] = useState('')
    // const [Shipping, setShipping] = useState(0)

    const cart = useSelector(state => state.cart)
    const products = useSelector(state => state.products)
    const coupon = useSelector(state => state.coupon)
    console.log(coupon);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getdata())
        dispatch(GetCoupon())
    }, [])

    const cartData = cart.cart.map((v) => {
        const productData = products.products.find((v1) => v1.id === v.pid);
        return { ...productData, qty: v.qty }
    })

    const subtotal = cartData.reduce((a, b) => a + b.price * b.qty, 0)

    const totaldescount = (subtotal * discount) / 100;

    const total = subtotal - totaldescount;

    const shipping = subtotal <= 100 ? 100 : 0

    const hendelIncrement = (id) => {
        dispatch(Icrement_cart(id))
    }

    const hendelDecrement = (id) => {
        dispatch(Decrement_cart(id))
    }

    const handleRemove = (id) => {
        dispatch(Remove_cartData(id))
    }

    const handlecoupon = (data) => {
        let flag = 0;
        let per = 0;
        // let ShippingAmount = 0
        coupon.coupon.map((v) => {
            if (v.couponCode === data.coupon) {
                const currentDate = new Date();

                const expiryDate = new Date(v.expiryDate);

                if (currentDate <= expiryDate) {
                    flag = 1
                    per = v.discount
                    setdiscount(per)
                } else {
                    flag = 2
                }
            }
            if (flag === 0) {
                formik.setFieldError("coupon", "Invalid Coupon Code.")
            } else if (flag === 1) {
                formik.setFieldError("coupon", `coupon code is succsessfully.you got ${per}% discount.`)
            } else if (flag === 2) {
                formik.setFieldError("coupon", "coupon code is expiry.")
            }


        })
        // if (subtotal <= 150) {
        //     ShippingAmount = 100
        //     setShipping(ShippingAmount)
        // }
    }


    let couponSchema = object({
        coupon: string().required('please enter coupon')
    })

    const formik = useFormik({
        initialValues: {
            coupon: ''
        },
        validationSchema: couponSchema,
        onSubmit: values => {
            handlecoupon(values)
        },
    })

    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = formik;

    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Cart Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartData.map((v) => (
                                        <tr>
                                            <th scope="row">
                                                <div className="d-flex align-items-center">
                                                    <img src={`../${v.image}`} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                                                </div>
                                            </th>
                                            <td>
                                                <p className="mb-0 mt-4">{v.name}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{v.price} $</p>
                                            </td>
                                            <td>
                                                <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                    <div className="input-group-btn">
                                                        <button onClick={() => hendelDecrement(v.id)} className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                            <i className="fa fa-minus" />
                                                        </button>
                                                    </div>
                                                    <span className="form-control form-control-sm text-center border-0">{v.qty}</span>
                                                    <div className="input-group-btn">
                                                        <button onClick={() => hendelIncrement(v.id)} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                            <i className="fa fa-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{(v.price * v.qty).toFixed(2)}$</p>
                                            </td>
                                            <td>
                                                <button onClick={() => handleRemove(v.id)} className="btn btn-md rounded-circle bg-light border mt-4">
                                                    <i className="fa fa-times text-danger" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <input
                                name='coupon'
                                type="text"
                                className="border-0 border-bottom rounded me-5 py-3 mb-4"
                                placeholder="Coupon Code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.coupon}
                            />
                            <button
                                className="btn border-secondary rounded-pill px-4 py-3 text-primary"
                                type="submit">
                                Apply Coupon
                            </button>
                        </form>
                        {
                            errors.coupon && touched.coupon ? <span style={{ color: 'red' }}>{errors.coupon}</span> : null
                        }
                    </div>

                    <div className="row g-4 justify-content-end">
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">${(subtotal).toFixed(2)}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        {
                                            discount > 0 &&
                                            <>
                                                <h5 className="mb-0 me-4">Discount</h5>
                                                <div className>
                                                    <p className="mb-0"> ${totaldescount}</p>
                                                </div>
                                            </>

                                        }

                                    </div>
                                    <br></br>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">Shipping</h5>
                                        <div className>
                                            <p className="mb-0">${shipping}</p>
                                        </div>
                                    </div>
                                    <p className="mb-0 text-end">Shipping to Ukraine.</p>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4">${(total).toFixed(2)}</p>
                                </div>
                                <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart Page End */}
        </div>

    );
}

export default Cart;

