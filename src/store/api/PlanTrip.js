// src/services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PlanTrip = createApi({
  reducerPath: 'PlanTrip',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5001' }),
  endpoints: (builder) => ({
    getRecommendations: builder.mutation({
      query: (data) => ({
        url: '/get_recommendations',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetRecommendationsMutation } = PlanTrip;
