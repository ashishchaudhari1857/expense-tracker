
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    themeChanger:localStorage.getItem("theme"),
    user:{},
}

const ThemeSlice=createSlice({
    name:"theme",
    initialState,
    reducers:{
        themechange:(state)=>{
            state.themeChanger=!state.themeChanger;
            localStorage.setItem("theme", state.themeChanger)
        },
        premium:(state)=>{
            console.log("call theme")
            localStorage.setItem("theme", true)
            state.themeChanger= true;
        },
        user:(state, actions)=>{
              state.user=actions.payload;
        },
       
    }

})

  export const  ThemeActions =ThemeSlice.actions;

  export default ThemeSlice.reducer;