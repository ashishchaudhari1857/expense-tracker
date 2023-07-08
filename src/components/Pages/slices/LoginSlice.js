import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem('token'),
  isLogged: localStorage.getItem('token') ? true : false,
};

export const loginSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.isLogged = true;
      state.token = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.isLogged = false;
      state.token = null;
    },
  },
});

export const authActions = loginSlice.actions;
export default loginSlice.reducer;
