
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    themeChanger:false,
    user:{},
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
        },
        user:(state, actions)=>{
              state.user=actions.payload;
        }
    }

})

  export const  ThemeActions =ThemeSlice.actions;

  export default ThemeSlice.reducer;