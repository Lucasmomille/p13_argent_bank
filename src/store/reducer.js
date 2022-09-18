import { createSlice } from "@reduxjs/toolkit";
import { userLogin, getUserInfos, editUserInfos } from "./action";

// If exist, initialize token from local storage
const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const initialState = {
  status: null,
  loading: false,
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
      state.status = null;
      state.loading = false;
      state.userInfo = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: {
    // User Login
    [userLogin.pending]: (state) => {
      state.status = null;
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.status = payload.status;
      state.loading = false;
      state.token = payload.body.token;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.status = payload.status;
      state.loading = false;
      state.error = payload.message;
    },
    // Get User Infos
    [getUserInfos.pending]: (state) => {
      state.loading = true;
    },
    [getUserInfos.fulfilled]: (state, { payload }) => {
      state.status = payload.status;
      state.loading = false;
      state.userInfo = payload.body;
    },
    [getUserInfos.rejected]: (state, { payload }) => {
      state.status = payload.status;
      state.loading = false;
      state.error = payload.message;
    },
    // Edit User Infos
    [editUserInfos.pending]: (state) => {
      state.loading = true;
    },
    [editUserInfos.fulfilled]: (state, { payload }) => {
      state.status = payload.status;
      state.loading = false;
      state.userInfo = payload.body;
    },
    [editUserInfos.rejected]: (state, { payload }) => {
      state.status = payload.status;
      state.loading = false;
      state.error = payload.message;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;