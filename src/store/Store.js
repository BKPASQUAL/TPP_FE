import { configureStore } from "@reduxjs/toolkit";
import { hotelApi } from "./api/hotelApi";

export const store = configureStore({
  reducer: {
    [hotelApi.reducerPath]: hotelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hotelApi.middleware),
});
