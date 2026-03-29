import { fakeStoreApi } from "../api/api";


interface uploadResponse {
  urls: string[]; 
}

export const fileApi = fakeStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<uploadResponse, FormData>({
      query: (files) => ({
        url: "/files/upload",
        method: "POST",
        body: files,
      }),
    }),
  }),
});


export const { useUploadFileMutation } = fileApi;