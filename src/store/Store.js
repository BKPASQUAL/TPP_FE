import { configureStore } from "@reduxjs/toolkit";
import { hotelApi } from "./api/hotelApi";
import { restaurantApi } from "./api/restaurantApi";

export const store = configureStore({
  reducer: {
    [hotelApi.reducerPath]: hotelApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      hotelApi.middleware,
      restaurantApi.middleware
    ),
});
