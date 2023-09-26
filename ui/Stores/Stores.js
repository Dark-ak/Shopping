import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice'
import alertReducer from "./alertSlice";
import checkReducer from "./checkSlice"


const store = configureStore({
    reducer:{
        products: productReducer,
        alert: alertReducer,
        check: checkReducer,

    }
})

export default store