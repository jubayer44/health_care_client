import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getSingleUser: builder.query({
        query: () => ({
          url: "/user/me",
          method: "GET",
        }),
        providesTags: [tagTypes.user]
      })
    }),
  });

export const { useGetSingleUserQuery } = userApi;
