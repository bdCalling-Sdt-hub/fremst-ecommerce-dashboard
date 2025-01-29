import { api } from "../api/baseApi";

const orderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/order",
        };
      },
      providesTags: ["Order"],
    }),
    orderProgress: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/order-progress",
        };
      },
    }),
    orderStatusChange : builder.mutation({
      query: ({ id, status }) => {
        return {
          method: "PATCH",
          url: `/order/${id}/${status}`,
          body: { status },
        };
      },
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useOrdersQuery, useOrderProgressQuery, useOrderStatusChangeMutation } = orderSlice;
