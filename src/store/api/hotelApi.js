import api from "./api";

export const hotelApi = api.injectEndpoints({
  reducerPath: "hotelApi",
  endpoints: (builder) => ({
    getHotelList: builder.query({
      query: () => "hotel/getAllHotels", // Ensure the endpoint path is correct
    }),
    addHotel: builder.mutation({
      query: (data) => ({
        url: "hotel/createHotel",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetHotelListQuery, useAddHotelMutation } = hotelApi;
