import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import { productApi } from "./features/product/prodcuctApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice,
      [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaltMiddleware) =>
      getDefaltMiddleware().concat(productApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
