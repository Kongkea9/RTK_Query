// import { productResponse } from "@/lip/types/productType"
// import { fakeStoreApi } from "../api/api"

// export const productApi = fakeStoreApi.injectEndpoints({
//     endpoints: (builder) =>({
//         getProducts: builder.query<productResponse[], void>,
//         query
    
//     })
// }

// )



import { productResponse } from "@/lip/types/productType"
import { fakeStoreApi } from "../api/api"

export const productApi = fakeStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<productResponse[], void>({
      query: () => "/products",
    }),
  }),
})


export const {useGetProductsQuery } = productApi