import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userChoiceApi = createApi({
  reducerPath: 'userChoiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001' }),
  endpoints: (builder) => ({
    getRecommendations: builder.mutation({
      query: (data) => ({
        url: '/get_recommendations',
        method: 'POST',
        body: data,
      }),
    }),
    getAccommodations: builder.mutation({
      query: (data) => ({
        url: '/get_accommodations',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetRecommendationsMutation, useGetAccommodationsMutation } = userChoiceApi;
