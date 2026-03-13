import { productRequst } from './../../types/productType';

import { productResponse } from "@/lip/types/productType"
import { fakeStoreApi } from "../api/api"

export const productApi = fakeStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<productResponse[], void>({
      query: () => "/products",
      providesTags: ["products"]
    }),

    addProducts: builder.mutation({
      query:(newProduct) => ({

        url: '/products',
        method: "POST",
        body: newProduct
      }),
      invalidatesTags: ["products"]

    }),

     getProduct: builder.query<productResponse, number>({
      query: (id) => `/products/${id}`,
    }),
  }),

 
})


export const {useGetProductsQuery, useAddProductsMutation, useGetProductQuery } = productApi











