import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSchedule: builder.mutation({
      query: (data: any) => ({
        url: "/schedule",
        method: "POST",
        data
      }),
      invalidatesTags: [tagTypes.schedule]
    }),
    getAllSchedules: builder.query({
      query: (args: Record<string, any>) => ({
        url: "/schedule",
        method: "GET",
        params: args
      }),
      providesTags: [tagTypes.schedule]
    }),
    deleteSchedule: builder.mutation({
      query: (id: string) => ({
        url: `/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.schedule]
    }),
  }),
});

export const { useCreateScheduleMutation, useGetAllSchedulesQuery, useDeleteScheduleMutation } = scheduleApi;
