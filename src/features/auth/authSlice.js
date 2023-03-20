import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    mode: "dark",
    user: null,
    token: null,
    isLoading: false,
    isSuccess: false,
    isError: null,
    posts: [],
  },
  reducers: {
    setUser: (state, action) => {
      const { findUser, token, message } = action.payload;
      if (message) {
        state.isError = message;
      }
      state.token = token;
      state.user = findUser;
    },
    setMode: (state, action) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    logout: (state, action) => {
      state.token = null;
      state.user = null;
      state.isSuccess = false;
      state.isError = null;
    },
    updateFriends: (state, action) => {
      const friends = action.payload;
      state.user.friends = friends;
    },
  },
});

export const { setUser, setMode, logout, updateFriends } = authSlice.actions;
