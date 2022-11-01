import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../utils/api";

export const userLogin = createAsyncThunk("/login", async (user, { rejectWithValue }) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user.userCode),
    };

    const response = await fetch(API_URL + "user/login", requestOptions);
    const data = await response.json();

    if (data.status === 200) {
      // If Remember me's input checked, store the user's token
      if (user.hasRemember) {
        localStorage.setItem("token", data.body.token);
      }
      return data;
    }
    return rejectWithValue(data);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getUserInfos = createAsyncThunk("user/getUserInfos", async (param, { getState, rejectWithValue }) => {
  try {
    const { user } = getState();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await fetch(API_URL + "user/profile", requestOptions);
    const data = await response.json();

    if (data.status === 200) {
      return data;
    }

    return rejectWithValue(data);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const editUserInfos = createAsyncThunk("user/editUserInfos", async (userData, { getState, rejectWithValue }) => {
  try {
    const { user } = getState();

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(API_URL + "user/profile", requestOptions);
    const data = await response.json();

    if (data.status === 200) {
      return data;
    }

    return rejectWithValue(data);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});