import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "users",
      }),
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {
              type: "User",
              id: "LIST",
            },
            // map over result.ids to create an object for each user to tag them so in future we can use the same tag for invalidation
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
      },
    }),
    getUser: builder.query({
      query: ([userId]) => ({
        url: `users/${userId}`,
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const user = { ...responseData };
        user.id = user._id;
        return usersAdapter.setOne(initialState, responseData);
      },
      providesTags: (result = [], error, arg) => {
        if (result?.ids) {
          return [
            {
              type: "User",
              id: "LIST",
            },
            // map over result.ids to create an object for each user to tag them so in future we can use the same tag for invalidation
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = usersApiSlice;

const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(selectUsersResult, (usersResult) => {
  return usersResult.data;
});

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
