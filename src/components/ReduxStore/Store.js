import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Pages/slices/LoginSlice"
import ExpenseReducer  from '../Pages/slices/ExpenseSlice'

const store=configureStore({
    reducer:{Auth:AuthReducer ,Exp:ExpenseReducer},
})

export default store;