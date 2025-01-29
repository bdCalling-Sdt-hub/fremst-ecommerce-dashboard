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
    getEmployeesByCompany: builder.query({
      query: (companyId) => {
        return {
          method: "GET",
          url: `/admin/employees/`,
          params: { companyId },
        };
      },
      providesTags: ["Employee"],
    }),
    createCompany: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/user/create-account",
          body: data,
        };
      },
      invalidatesTags: ["Company"],
    }),
    updateCompany: builder.mutation({
      query: ({ id, data }) => {
        return {
          method: "PATCH",
          url: `/admin/company/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["Company"],
    }),
    getAllAdmins: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/admins",
        };
      },
      providesTags: ["Admin"],
    }),
    createAdmin: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/user/create-account",
          body: data,
          
        };
      },
      invalidatesTags: ["Admin"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/user/admin/${id}`,
        };
      },
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useAdminQuery,
  useGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
  useGetEmployeesByCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
} = userSlice;
