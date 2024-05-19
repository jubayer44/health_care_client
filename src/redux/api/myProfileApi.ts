import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const myProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: [tagTypes.user],
        }),
        updateMyProfile: builder.mutation({
            query: (data) => ({
                url: "/user/update-my-profile",
                method: "PATCH",
                data,
                contentType: 'multipart/form-data',
            }),
            invalidatesTags: [tagTypes.user],
        }),
    }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = myProfileApi;