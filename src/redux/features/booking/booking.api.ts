import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking",
        method: "POST",
        data: bookingData,
      }),
      invalidatesTags: ["BOOKING"],
    }),
    getBookingsByUser: builder.query({
      query: () => ({
        url: "/booking/my-bookings",
      }),
      providesTags: ["BOOKING"],
      transformResponse: (response) => response.data,
    }),
    getAllBookings: builder.query({
      query: (params) => ({
        url: "/booking",
        method: "GET",
        params, // important for pagination + search
      }),
      providesTags: ["BOOKING"],
    }),

    getTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsByUserQuery,
  useGetAllBookingsQuery,
} = bookingApi;
