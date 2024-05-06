import { create } from "@mui/material/styles/createTransitions";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { get } from "react-hook-form";

export const baseURL = createApi({
  reducerPath: "baseURL",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      // Automatically include the 'Content-Type' header for every request
      headers.set("Content-Type", "application/json");
      // Include the 'Authorization' header if a JWT cookie is available
      const token = Cookies.get("jwt");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),

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
    }),
getAllFriends: builder.query({
      query: () => "friends/friendsList/",
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
} = baseURL;
