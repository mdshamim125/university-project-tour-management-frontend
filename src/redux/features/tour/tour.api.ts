/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IResponseWithMeta, ITourPackageResponse } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTour: builder.mutation({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
      }),
      invalidatesTags: ["TOUR"],
    }),
    addTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOUR"],
    }),
    removeTourType: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-types/${tourTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),
    getTourTypes: builder.query({
      query: (params) => ({
        url: "/tour/tour-types",
        method: "GET",
        params,
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => response.data,
    }),
    getAllTours: builder.query<
      IResponseWithMeta<ITourPackageResponse[]>,
      Record<string, any>
    >({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params,
      }),
      providesTags: ["TOUR"],
    }),
    removeTour: builder.mutation({
      query: (tourId) => ({
        url: `/tour/${tourId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),

    updateTour: builder.mutation({
      query: ({ id, ...tourData }) => ({
        url: `/tour/${id}`,
        method: "PATCH", // or PUT if your backend uses PUT for full update
        data: tourData,
      }),
      invalidatesTags: ["TOUR"], // invalidate TOUR cache to refresh data
    }),
    getTourById: builder.query<any, string>({
      query: (id) => ({
        url: `/tour/${id}`,
        method: "GET",
      }),
      providesTags: ["TOUR"],
      transformResponse: (response: any) => response?.data?.data?.[0],
    }),
  }),
});

export const {
  useGetTourTypesQuery,
  useAddTourTypeMutation,
  useRemoveTourTypeMutation,
  useAddTourMutation,
  useGetAllToursQuery,
  useRemoveTourMutation,
  useUpdateTourMutation,
  useGetTourByIdQuery,
} = tourApi;
