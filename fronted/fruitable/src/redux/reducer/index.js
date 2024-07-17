import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { facilitiesReducer } from "./facilities.reducer";
import { shopReducer } from "./shop.reducer";
import { reviewReducer } from "./review.rducer";
import counterSlice from "./slice/counter.slice";
import cartSlice from "./slice/cart.silce";
import couponSlice from "./slice/coupon.slice";
import { categoryReducer } from "./category.reducer";
import subcategorySlice from "./slice/subcategory.slice";
import { productReducer } from "./products.reducer";
import variantsSlice from "./slice/variant.silce";
import { salespeopleReducer } from "./salespeople.reducer";

export const rootReducer = combineReducers({
    counter: counterReducer,
    facilities: facilitiesReducer,
    product: productReducer,
    shop: shopReducer,
    review: reviewReducer,
    counter_slice: counterSlice,
    cart: cartSlice,
    coupon: couponSlice,
    category: categoryReducer,
    subcategory: subcategorySlice,
    variants: variantsSlice,
    salespeople: salespeopleReducer
})