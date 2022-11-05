import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const dbApi = createApi({
  reducerPath: "dbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["dbAdresses", "ttn"],
  endpoints: (build) => ({
    checkDbCity: build.query({
      query: (city: string) => ({
        url: `city/?value=${city}`,
        method: "GET",
      }),
    }),
    addTtn: build.mutation({
      query: (ttn: string) => ({
        url: "ttn/",
        method: "POST",
        body: { value: ttn },
      }),
      invalidatesTags: ["ttn"],
    }),
    delTtn: build.mutation({
      query: () => ({
        url: "ttn/",
        method: "DELETE",
      }),
      invalidatesTags: ["ttn"],
    }),
    getTtn: build.query({
      query: () => ({
        url: "ttn/",
        method: "GET",
      }),
      providesTags: ["ttn"],
    }),
  }),
});

export const {
  useLazyCheckDbCityQuery,
  useAddTtnMutation,
  useGetTtnQuery,
  useDelTtnMutation,
} = dbApi;
