import { configureStore } from "@reduxjs/toolkit";
import { hotelApi } from "./api/hotelApi";
import { restaurantApi } from "./api/restaurantApi";
import { userChoiceApi } from "./api/userChoiceApi";

export const store = configureStore({
  reducer: {
    [hotelApi.reducerPath]: hotelApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
    [userChoiceApi.reducerPath]: userChoiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      hotelApi.middleware,
      restaurantApi.middleware,
      userChoiceApi.middleware
    ),
});
