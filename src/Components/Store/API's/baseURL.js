import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseURL = createApi({
  reducerPath: "baseURL",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      // headers.set("Content-Type", "application/json");
      const token = Cookies.get("jwt");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),

  tagTypes: ["User", "Post", "Friend"],

  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (body) => ({
        url: "users/signup",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "users/login/",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "users/logout/",
        method: "POST",
      }),
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: "posts/",
        method: "POST",
        body,
      }),
    }),
    getPosts: builder.query({
      query: () => "posts/",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    getAllFriends: builder.query({
      query: () => "friends/friendsList/",
    }),

    addFriend: builder.mutation({
      query: (body) => ({
        url: "friends/",
        method: "POST",
        body,
        invalidatesTags: ["Friend"],
      }),
    }),
   
  }),
});

export const {
  useSignupUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useCreatePostMutation,
  useGetPostsQuery,
  useGetAllFriendsQuery,
  useAddFriendMutation,
} = baseURL;
