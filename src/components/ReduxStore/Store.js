import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Pages/slices/LoginSlice"
import ExpenseReducer  from '../Pages/slices/ExpenseSlice'
import ThemeReducer from '../Pages/slices/Themeslice'
const store=configureStore({
    reducer:{Auth:AuthReducer ,Exp:ExpenseReducer,Theme:ThemeReducer},
})

export default store;