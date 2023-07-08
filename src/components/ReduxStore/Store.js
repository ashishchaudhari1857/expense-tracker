import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Pages/LoginSlice/LoginSlice"

const store=configureStore({
    reducer:{Auth:AuthReducer},
})

export default store;