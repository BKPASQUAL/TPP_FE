import React from "react";
import "../../assets/css/Restaurant.css";
import Resimg from "../../assets/images/Unawatuna.jpg";

function Restaurant() {
  return (
    <div className="restaurant-main">
      <div className="restaurant-main-top">
        <p>Restaurants In Galle Area</p>
      </div>
      {/* <div className="restaurant-top-btn">
        <button>All</button>
        <button>Galle</button>
        <button>Hikkaduwa</button>
        <button>Unawatuna</button>
      </div> */}
      <div className="restaurant-main-btm">
        <div className="restaurant-con">
          <div className="restaurant-box-con">
            <div className="restaurant-img">
              <img src={Resimg} alt="Restaurant" />
            </div>
            <div className="restaurant-con-btm">
              <div>
                <div className="restaurant-con-btm-title">Hello Restaurant</div>
              </div>
              <div className="restaurant-con-btm-left">
                Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
