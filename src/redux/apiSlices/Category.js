import { api } from "../api/baseApi";

const categorySlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({
                url: "category",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token")
                    )}`,
                },
            }),
            providesTags: ["Category"],
        }),
        addCategory: builder.mutation({
            query: (data) => ({
                url: "category",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token")
                    )}`,
                },
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),
        updateCategory: builder.mutation({
            query: ({ data, id }) => ({
                url: `category/${id}`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token")
                    )}`,
                },
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),
        
    }),
});

export const { useGetAllCategoriesQuery, useAddCategoryMutation, useUpdateCategoryMutation,  } = categorySlice;