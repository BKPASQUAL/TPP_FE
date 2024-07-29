import React, { useState } from "react";
import "../../assets/css/Hotel.css";
import { Rate, SelectPicker } from "rsuite";
import HomeBtm from "./HomeBtm";
import Chatbot from "../common/Chatbot";
import chatIcon from "../../assets/images/chatbot-removebg-preview.png";
import HotelData from "../../assets/data/HotelData.json";

function Hotel() {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <>
      <div className="hotel-main">
        <div className="hotel-main-top">
          <div className="hotel-main-title">
            Hotels And Villas In Galle Area
          </div>
        </div>
        <div className="hotel-main-btm">
          <SelectPicker
            searchable={false}
            style={{ width: 224, marginRight: "25px" }}
            placeholder="Hotel or Villa"
            data={[]}
          />
          <SelectPicker
            searchable={false}
            style={{ width: 224, marginRight: "25px" }}
            placeholder="Room Type"
            data={[]}
          />
          <SelectPicker
            searchable={false}
            style={{ width: 224, marginRight: "25px" }}
            placeholder="Location"
            data={[]}
          />
          <SelectPicker
            searchable={false}
            style={{ width: 224, marginRight: "25px" }}
            placeholder="Price"
            data={[]}
          />
        </div>
        <div className="hotels">All Hotels In Galle Area</div>
        <div className="hotel-con">
          {HotelData.map((hotel) => (
            <div className="hotel-box-con" key={hotel.id}>
              <div className="hotel-box-con-top">
                <img src={hotel.picture.url} alt="hotel" className="hotelimg" />
              </div>
              <div className="hotel-box-con-btm">
                <div className="hotel-box-con-btm-left">
                  <div className="hotel-box-con-btm-title">
                    {hotel.name} {hotel.location.city}
                  </div>
                  <div>
                    <Rate
                      defaultValue={
                        hotel.stars?.count || hotel.reviews?.count / 50
                      }
                      style={{
                        width: "80px",
                        fontSize: "12px",
                        marginBottom: "0px",
                        color: "black",
                      }}
                      allowHalf
                      readOnly
                    />
                  </div>
                </div>
                <div className="hotel-box-con-btm-right">
                  <h1>{hotel.pricing_quote.primary.price}LKR</h1>
                </div>
              </div>
            </div>
          ))}
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

export default Hotel;
