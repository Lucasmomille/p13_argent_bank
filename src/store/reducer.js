import { createSlice } from "@reduxjs/toolkit";
import { userLogin, getUserInfos, editUserInfos } from "./action";

// get token from local storage if it's here
const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const initialState = {
  userInfo: null,
  token,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.userInfo = null;
      state.token = null;
      state.error = null; // check
    },
  },
  extraReducers: {
    // User Login
    [userLogin.fulfilled]: (state, { payload }) => {
      state.token = payload.body.token;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.error = payload.message;
    },
    // Edit User Infos
    [editUserInfos.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.body;
    },
    [editUserInfos.rejected]: (state, { payload }) => {
      state.error = payload.message;
    },
    // User Infos
    [getUserInfos.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.body;
    },
    [getUserInfos.rejected]: (state, { payload }) => {
      state.error = payload.message;
    }
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;