import { TDoctor } from "@/types/doctor";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
import { TMeta } from "@/types";

const doctorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createDoctor: builder.mutation({
            query: (data: any) => ({
                url: "/user/create-doctor",
                method: "POST",
                contentType: "multipart/form-data",
                data
            }),
            invalidatesTags: [tagTypes.doctor]
        }),
        getAllDoctors: builder.query({
            query: (arg: Record<string, any>)=> ({
                url: "/doctor",
                method: "GET",
                params: arg
            }),
            transformResponse: (res: TDoctor[], meta: TMeta) => ({
                doctors: res,
                meta
            }),
            providesTags: [tagTypes.doctor]
        }),
        deleteDoctor: builder.mutation({
            query: (id: string) => ({
                url: `/doctor/soft/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [tagTypes.doctor]
        })
    })
});

export const { useCreateDoctorMutation, useGetAllDoctorsQuery, useDeleteDoctorMutation } = doctorApi;