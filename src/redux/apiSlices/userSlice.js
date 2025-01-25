import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=ADMIN",
        };
      },
    }),
    getAllCompanies: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/companies",
        };
      },
      providesTags: ["Company"],
    }),
    vendors: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=VENDOR",
        };
      },
    }),
    userById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/user/profile/${id}`,
        };
      },
    }),
  }),
});

export const {
  useAdminQuery,
  useGetAllCompaniesQuery,
  useVendorsQuery,
  useUserByIdQuery,
} = userSlice;
