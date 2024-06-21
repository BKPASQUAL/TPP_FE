import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelApi = createApi({
  baseQuery: fetchBaseQuery(),
  reducerPath: "hotelApi",
  endpoints: (builder) => ({
    getHotelList1: builder.query({
      query: () => ({
        url: "https://api.apify.com/v2/datasets/bYnHRUPbypZQrtNFA/items?clean=true&format=json",
      }),
    }),
    getHotelList2: builder.query({
      query: () => ({
        url: "https://api.apify.com/v2/datasets/Sw1lq2xCileS11anW/items?clean=true&format=json",
      }),
    }),
  }),
});

export const { useGetHotelList1Query, useGetHotelList2Query } = hotelApi;
