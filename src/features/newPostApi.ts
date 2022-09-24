import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import NEWPOSTURL from "../constants";

export const newPostApi = createApi({
  reducerPath: "newPostApi",
  baseQuery: fetchBaseQuery({ baseUrl: NEWPOSTURL }),
  tagTypes: ["Order", "Addreses"],
  endpoints: (build) => ({
    getStatus: build.mutation({
      query: (tth: string) => ({
        url: "",
        method: "POST",
        body: {
          apiKey: "853151f9823953b980cea3dc6b9d795b",
          modelName: "TrackingDocument",
          calledMethod: "getStatusDocuments",
          methodProperties: {
            Documents: [
              {
                DocumentNumber: tth,
              },
            ],
          },
        },
      }),
      invalidatesTags: ["Order"],
    }),
    getAdresses: build.mutation({
      query: (city: string) => ({
        url: "",
        method: "POST",
        body: {
          apiKey: "853151f9823953b980cea3dc6b9d795b",
          modelName: "Address",
          calledMethod: "getWarehouses",
          methodProperties: {
            CityName: city,
            Page: "1",
            Limit: "50",
            Language: "UA",
          },
        },
      }),
      invalidatesTags: ["Addreses"],
    }),
  }),
});

export const { useGetStatusMutation, useGetAdressesMutation } = newPostApi;
