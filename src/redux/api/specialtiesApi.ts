import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSpecialty: builder.mutation({
      query: (data: any) => ({
        url: "/specialties",
        method: "POST",
        contentType: "multipart/form-data",
        data
      }),
      invalidatesTags: [tagTypes.specialties]
    }),
    getAllSpecialties: builder.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
      }),
      providesTags: [tagTypes.specialties]
    }),
    deleteSpecialty: builder.mutation({
      query: (id: string) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.specialties]
    }),
  }),
});

export const { useCreateSpecialtyMutation, useGetAllSpecialtiesQuery, useDeleteSpecialtyMutation } = specialtiesApi;
