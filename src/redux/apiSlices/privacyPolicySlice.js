import { api } from "../api/baseApi";

const privacyPolicySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updatePricyPolicy: builder.mutation({
      query: (data) => {
        return {
          url: `/others`,
          method: "POST",
          body: data,
        };
      },
    }),
    privacyPolicy: builder.query({
      query: () => {
        return {
          url: `/others/privacy-policy`,
          method: "GET",
        };
      },
    }),

    //faq
    getFaq: builder.query({
      query: () => {
        return {
          url: `/others/get-faq`,
          method: "GET",
        };
      },
      providesTags: ["Faq"],
    }),
    createFaq: builder.mutation({
      query: (data) => {
        return {
          url: `/others/faq`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Faq"],
    }),
    updateFaq: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/others/faq/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Faq"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => {
        return {
          url: `/others/faq/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Faq"],
    }),
  }),
});

export const {
  useUpdatePricyPolicyMutation,
  usePrivacyPolicyQuery,

  //faq
  useGetFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = privacyPolicySlice;
