import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { facilitiesReducer } from "./facilities.reducer";
import { productsReducer } from "./products.reducer";
import { shopReducer } from "./shop.reducer";
import { reviewReducer } from "./review.rducer";
import counterSlice from "./slice/counter.slice";
import cartSlice from "./slice/cart.silce";
import couponSlice from "./slice/coupon.slice";
import { categoryReducer } from "./category.reducer";
import subcategorySlice from "./slice/subcategory.slice";

export const rootReducer = combineReducers({
    counter: counterReducer,
    facilities: facilitiesReducer,
    products: productsReducer,
    shop: shopReducer,
    review: reviewReducer,
    counter_slice: counterSlice,
    cart: cartSlice,
    coupon: couponSlice,
    category: categoryReducer,
    subcategory: subcategorySlice

})