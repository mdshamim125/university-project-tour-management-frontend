/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query<any, void>({
      query: () => ({
        url: "/stat/user",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),

    getBookingStats: builder.query<any, void>({
      query: () => ({
        url: "/stat/booking",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),

    getPaymentStats: builder.query<any, void>({
      query: () => ({
        url: "/stat/payment",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),

    getTourStats: builder.query<any, void>({
      query: () => ({
        url: "/stat/tour",
        method: "GET",
      }),
      providesTags: ["STATS"],
    }),
  }),
});

export const {
  useGetUserStatsQuery,
  useGetBookingStatsQuery,
  useGetPaymentStatsQuery,
  useGetTourStatsQuery,
} = statsApi;
