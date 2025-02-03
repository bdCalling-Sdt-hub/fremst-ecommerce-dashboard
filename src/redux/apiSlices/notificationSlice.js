import { api } from "../api/baseApi";

const notificationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    notification: builder.query({
      query: () => {
        return {
          url: `/notification`,
          method: "GET",
        };
      },
      providesTags: ["Notification"],
    }),
    readNotification: builder.mutation({
      query: (id) => {
        return {
          url: `/notification/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const { useNotificationQuery, useReadNotificationMutation } =
  notificationSlice;
