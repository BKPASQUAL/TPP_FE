import React, { useState } from "react";
import "../../assets/css/Restaurant.css";
import chatIcon from "../../assets/images/chatbot-removebg-preview.png";
import Chatbot from "../common/Chatbot";
import HomeBtm from "./HomeBtm";

import restaurantData from "../../assets/data/galle_hikkaduwa_unawatuna_restaurants.json";

function Restaurant() {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };
  return (
    <>
      <div className="restaurant-main">
        <div className="restaurant-main-top">
          <p>Restaurants In Galle Area</p>
        </div>
        <div className="restaurant-main-btm">
          <div className="restaurant-con">
            {restaurantData.map((restaurant) => (
              <div
                className="restaurant-box-con"
                key={restaurant["Location Link"]}
              >
                <div className="restaurant-img">
                  <img
                    src={
                      restaurant["Image URLs"]
                        ? restaurant["Image URLs"][0]
                        : "default_image_url"
                    }
                    alt={restaurant.Name}
                  />
                </div>
                <div className="restaurant-con-btm">
                  <div className="restaurant-con-btm-title">
                    {restaurant.Name || "Unnamed Restaurant"}
                  </div>
                  <div className="restaurant-con-btm-left">
                    Rating: {restaurant.Rating ? restaurant.Rating : "N/A"}
                  </div>
                  {/* <div className="restaurant-con-btm-address">
                  {restaurant.Address}
                </div>  */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <img
        src={chatIcon}
        alt="chaticon"
        className="chatbotIcon"
        onClick={toggleChatbot}
      />
      {showChatbot && <Chatbot />}
      <HomeBtm />
    </>
  );
}

export default Restaurant;
