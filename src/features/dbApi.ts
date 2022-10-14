import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const dbApi = createApi({
  reducerPath: "dbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["dbAdresses"],
  endpoints: (build) => ({
    addDbCity: build.mutation({
      query: (city: string) => ({
        url: "city/",
        method: "POST",
        body: { value: city },
      }),
    }),
    addDbWarhouses: build.mutation({
      query: (newDbdata) => ({
        url: "warhouse/",
        method: "POST",
        body: { ...newDbdata },
      }),
    }),
    checkDbCity: build.query({
      query: (city: string) => ({
        url: `city/?value=${city}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddDbCityMutation,
  useAddDbWarhousesMutation,
  useLazyCheckDbCityQuery,
} = dbApi;
