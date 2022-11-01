import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface User {
  username: string;
  id: number;
}
export interface UserResponse {
  user: User;
  refreshToken: string;
  accessToken: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}
export interface ErrorMessage {
  message: string;
}
export interface ServerError {
  data: ErrorMessage;
  status: number;
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/user/",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registration: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "registration",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    checkAuth: builder.query({
      query: () => ({ url: "refresh" }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useLogoutMutation,
  useLazyCheckAuthQuery,
} = authApi;
