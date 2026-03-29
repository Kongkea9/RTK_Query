import { categoryResponse } from "@/lip/types/categoryType";
import { fakeStoreApi } from "../api/api";

export const categoryApi = fakeStoreApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories : builder.query<categoryResponse[], void>({
            query: () => "/categories",
            providesTags: ["categories"],
        })

    })
})


export const {useGetCategoriesQuery} = categoryApi;
