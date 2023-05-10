import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "api/apiSlice";
import { parseISO } from "date-fns";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    // const date = parseISO(a.createdAt);
    return parseISO(b.createdAt) - parseISO(a.createdAt);
  },
});

const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      transformResponse: (responseData) => {
        const loadedPosts = responseData.map((post) => {
          post.id = post._id;
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            // Create an object that contains two objects
            {
              type: "Post",
              id: "LIST",
            },
            // map over result.ids to create an object for each post to tag them so in future we can use the same tag for invalidation
            ...result.ids.map((id) => ({ type: "Post", id })),
          ];
        } else {
          return [{ type: "Post", id: "LIST" }];
        }
      },
    }),
    createPost: builder.mutation({
      query: ([data]) => ({
        url: "/posts/createPost",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    createComment: builder.mutation({
      query: ([userId, postId, comment]) => ({
        url: `posts/${postId}`,
        method: "POST",
        body: {
          userId,
          comment,
        },
      }),
      invalidatesTags: (result, err, arg) => {
        return [{ type: "Post", id: arg.postId }];
      },
    }),
    editComment: builder.mutation({
      query: ([postId, commentId, editComment]) => ({
        url: `posts/${postId}`,
        method: "PUT",
        body: {
          commentId,
          editComment,
        },
      }),
      invalidatesTags: (result, err, arg) => {
        return [{ type: "Post", id: arg.postId }];
      },
    }),
    likePost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `posts/${postId}/like`,
        method: "PATCH",
        body: userId,
      }),
      invalidatesTags: (result, err, arg) => {
        return [{ type: "Post", id: arg.postId }];
      },
    }),
    addFriend: builder.mutation({
      query: ({ postId, id, friendId }) => ({
        url: `users/${id}/${friendId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Post", id: arg.postId }];
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useAddFriendMutation,
  useCreateCommentMutation,
  useEditCommentMutation,
} = postsApiSlice;
