import React from 'react';
import '../../assets/css/Restaurant.css';
import { useGetRestaurantListQuery } from '../../store/api/restaurantApi'; // Update the path as needed

function Restaurant() {
  const { data: restaurantsData, error, isLoading } = useGetRestaurantListQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading restaurants</p>;

  return (
    <div className="restaurant-main">
      <div className="restaurant-main-top">
        <p>Restaurants In Galle Area</p>
      </div>
      <div className="restaurant-main-btm">
        <div className="restaurant-con">
          {restaurantsData.map((restaurant) => (
            <div className="restaurant-box-con" key={restaurant.url}>
              <div className="restaurant-img">
                <img src={restaurant.imageUrls ? restaurant.imageUrls[0] : 'default_image_url'} alt={restaurant.categoryName} />
              </div>
              <div className="restaurant-con-btm">
                <div className="restaurant-con-btm-title">
                  {restaurant.name || restaurant.categoryName}
                </div>
                <div className="restaurant-con-btm-left">
                  Rating: {restaurant.reviewsDistribution ? (restaurant.reviewsDistribution.fiveStar / (Object.values(restaurant.reviewsDistribution).reduce((a, b) => a + b))) * 5 : 'N/A'}
                </div>
                <div className="restaurant-con-btm-address">
                  {restaurant.address}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
