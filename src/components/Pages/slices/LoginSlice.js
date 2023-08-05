import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem('token'),
  isLogged: localStorage.getItem('token') ? true : false,
  userid:localStorage.getItem('id')
};

export const loginSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      const {token, id}=action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem('id',id.replace(".", ""))
      state.isLogged = true;
      state.userid = id.replace(".", "");
      state.token = token;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      state.isLogged = false;
      state.token = null;
      state.userid=null;
    },
  },
});

export const authActions = loginSlice.actions;
export default loginSlice.reducer;
