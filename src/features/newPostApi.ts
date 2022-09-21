import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import NEWPOSTURL from "../constants";

export const newPostApi = createApi({
  reducerPath: "newPostApi",
  baseQuery: fetchBaseQuery({ baseUrl: NEWPOSTURL }),
  tagTypes: ["Order"],
  endpoints: (build) => ({
    getStatus: build.mutation({
      query: (tth) => ({
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
  }),
});

export const { useGetStatusMutation } = newPostApi;
