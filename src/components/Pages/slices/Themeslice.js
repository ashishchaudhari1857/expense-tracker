
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    themeChanger:false,
}

const ThemeSlice=createSlice({
    name:"theme",
    initialState,
    reducers:{
        themechange:(state)=>{
            state.themeChanger=!state.themeChanger;
        },
        premium:(state)=>{
            console.log("call theme")
            state.themeChanger= true;
        }
    }

})

  export const  ThemeActions =ThemeSlice.actions;

  export default ThemeSlice.reducer;