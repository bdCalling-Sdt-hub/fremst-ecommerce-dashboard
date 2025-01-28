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
    getCompanyById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/admin/company/${id}`,
        };
      },
      providesTags: ["Company"],
    }),
  }),
});

export const {
  useAdminQuery,
  useGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
} = userSlice;
