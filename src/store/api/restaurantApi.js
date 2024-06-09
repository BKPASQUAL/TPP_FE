import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const restaurantApi = createApi({
  baseQuery: fetchBaseQuery(),
  reducerPath: 'restaurantApi',
  endpoints: (builder) => ({
    getRestaurantList: builder.query({
      query: () => ({
        url: 'https://api.apify.com/v2/datasets/q218sYDxQBxmnnL0e/items?clean=true&fields=phone,hotelStars,categories,menu,state,reviewsDistribution,peopleAlsoSearch,images,imageCategories,description,location,url,googleFoodUrl,imageUrls,rank,address,locatedIn,hotelReviewSummary,price,website,city,categoryName&format=json',
      
      }),
    }),
  }),
});

export const { useGetRestaurantListQuery } = restaurantApi;
