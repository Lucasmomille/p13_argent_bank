import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../utils/api";

const request = (method, token) => {
  return {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
}
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
      console.log('data login 200', user)
      // If Remember me's input checked, store the user's token
      if (user.hasRemember) {
        console.log('user remember')
        localStorage.setItem("token", data.body.token);
        console.log('user remember login', localStorage.getItem("token"))
      }
      return data;
    }

    console.error(data.message);
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
    console.log('user remember getuserinfo', localStorage.getItem("token"))
    if (data.status === 200) {
      return data;
    }

    console.log("error", data.message);
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

    console.error(data.message);
    return rejectWithValue(data);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});