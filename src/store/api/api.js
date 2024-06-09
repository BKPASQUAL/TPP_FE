import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Initialize an empty API service that we'll inject endpoints into later as needed
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.apify.com/v2/datasets/YzqspUxwJlfpYv73T/items?clean=true&format=json',
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem('accessToken'); 
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;
