import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ITourPackage } from "@/types/tour/tour.type";

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
    getAllTours: builder.query<ITourPackage[], unknown>({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params: params,
      }),
      providesTags: ["TOUR"],
      transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
    }),
  }),
});

export const {
  useGetTourTypesQuery,
  useAddTourTypeMutation,
  useRemoveTourTypeMutation,
  useAddTourMutation,
  useGetAllToursQuery,
} = tourApi;
