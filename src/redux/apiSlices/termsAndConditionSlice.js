import { api } from "../api/baseApi";

const termsAndConditionSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateTermsAndConditions: builder.mutation({
      query: (data) => {
        return {
          url: `/others`,
          method: "POST",
          body: data,
        };
      },
    }),
    termsAndCondition: builder.query({
      query: () => {
        return {
          url: `/others/terms-and-conditions`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useTermsAndConditionQuery,
  useUpdateTermsAndConditionsMutation,
} = termsAndConditionSlice;
