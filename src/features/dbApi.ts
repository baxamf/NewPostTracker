import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { PackageInitilaState } from "./packageSlice";

interface TtnRequest {
  value:string
  userId:number
}

interface TtnResponse {
  id: number,
  value: string
}

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
    addTtn: build.mutation<PackageInitilaState, TtnRequest>({
      query: (newTtn) => ({
        url: "ttn/",
        method: "POST",
        body: newTtn,
      }),
      invalidatesTags: ["ttn"],
    }),
    delTtn: build.mutation({
      query: (id:number) => ({
        url: `ttn/?userId=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ttn"],
    }),
    getTtn: build.query<TtnResponse[], number>({
      query: (id) => ({
        url: `ttn/?userId=${id}`,
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
