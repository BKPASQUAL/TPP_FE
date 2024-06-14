import { configureStore } from "@reduxjs/toolkit";
import { hotelApi } from "./api/hotelApi";
import { restaurantApi } from "./api/restaurantApi";
import { PlanTrip } from "./api/PlanTrip";

export const store = configureStore({
  reducer: {
    [hotelApi.reducerPath]: hotelApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
    [PlanTrip.reducerPath]: PlanTrip.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      hotelApi.middleware,
      restaurantApi.middleware,
      PlanTrip.middleware
    ),
});
