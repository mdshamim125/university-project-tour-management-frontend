/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IResponseWithMeta, IUserResponse } from "@/types/user/user.type";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      IResponseWithMeta<IUserResponse[]>,
      Record<string, any>
    >({
      query: (params) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),

    removeUser: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),

    updateProfile: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),

    updateUserRoleStatus: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/user/status/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useRemoveUserMutation,
  useUpdateUserRoleStatusMutation,
  useUpdateProfileMutation,
} = userApi;
