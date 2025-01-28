import { api } from "../api/baseApi";

const productSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/product",
        };
      },
    }),
    getCategories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/category",
        };
      },
    }),
    getProductsByCategory: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/product/`,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
    }),
    getSingleProduct: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/product/${id}`,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
    }),
    createProduct: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/product",
          body: data,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        return {        
          method: "PATCH",
          url: `/product/${id}`,        
          body: data,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/product/${id}`,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery, useCreateProductMutation, useUpdateProductMutation , useDeleteProductMutation , useGetProductsByCategoryQuery, useGetSingleProductQuery } = productSlice;
