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
    orderStatusChange: builder.mutation({
      query: ({ id, status }) => {
        return {
          method: "PATCH",
          url: `/order/${id}/${status}`,
          body: { status },
        };
      },
      invalidatesTags: ["Order"],
    }),
    getOrderStatsForUser: builder.query({
      query: (status, id) => {
        return {
          method: "GET",
          url: `order/stats/${status}/${
            id && "companyId" in id ? id.companyId : ""
          }`,
        };
      },
      providesTags: ["Order"],
    }),
    getEmployeeOrdersHistory: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/order/user-order?employeeId=${id}`,
        };
      },
      providesTags: ["Order"],
    }),
    getCompanyOrdersHistory: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/order/user-order?companyId=${id}`,
        };
      },
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useOrdersQuery,
  useOrderProgressQuery,
  useOrderStatusChangeMutation,
  useGetOrderStatsForUserQuery,
  useGetEmployeeOrdersHistoryQuery,
  useGetCompanyOrdersHistoryQuery,
} = orderSlice;
