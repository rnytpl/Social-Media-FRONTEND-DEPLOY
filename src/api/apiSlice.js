import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sociopedia-api-dso2.onrender.com",
    // baseUrl: process.env.REACT_APP_DEV,
    prepareHeaders: (headers, { getState }) => {
      // getState allows you to access your redux store
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth", "User", "Post"],
  endpoints: (builder) => ({}),
});
