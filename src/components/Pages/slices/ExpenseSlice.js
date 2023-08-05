import { createSlice } from "@reduxjs/toolkit";

const initialState={
    expenses:[],
    totalAmount:0,
}


const ExpenseSlice =createSlice({
    name:"expense",
    initialState,
    reducers:{
        addtoexpense:(state,action)=>{
            console.log("actionpayloda" ,action.payload)
           state.expenses=[...action.payload];
           state.totalAmount = action.payload && action.payload.reduce((total, item) => {
            console.log("item:", item);
            console.log("total:", total);
            return total + parseInt(item.Amount);
          }, 0);
        }
    }
})


export const  ExpenseActions =ExpenseSlice.actions;
export default  ExpenseSlice.reducer;