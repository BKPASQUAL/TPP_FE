import React, { useState } from "react";
import "../../assets/css/Hotel.css";
import { useGetHotelListQuery } from "../../store/api/hotelApi";
import { Rate } from "rsuite";
import { SelectPicker } from "rsuite";
import HomeBtm from "./HomeBtm";
import Chatbot from "../common/Chatbot";
import chatIcon from "../../assets/images/chatbot-removebg-preview.png";

function Hotel() {
  const { data: hotelsData, error, isLoading } = useGetHotelListQuery();
  const [showChatbot, setShowChatbot] = useState(false);
  console.log(hotelsData);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading hotels</p>;

  return (
    <>
      <div className="hotel-main">
        <div className="hotel-main-top">
          <div className="hotel-main-titile">
            Hotels And Villas In Galle Area
          </div>
        </div>
        <div className="hotel-main-btm">
          <SelectPicker
            searchable={false}
            style={{ width: 224, marginRight: "25px" }}
            placeholder="Hotel or Villa"
          />
          <SelectPicker
            searchable={false}
            style={{ width: 224, marginRight: "25px" }}
            placeholder="Room Type"
          />
          <SelectPicker
            searchable={false}
            style={{ width: 224, marginRight: "25px" }}
            placeholder="Location"
          />
          <SelectPicker
            searchable={false}
            style={{ width: 224, marginRight: "25px" }}
            placeholder="Price"
          />
        </div>
        <div className="hotels">All Hotels In Galle Area</div>
        <div className="hotel-con">
          {hotelsData.payload.map((hotel) => (
            <div className="hotel-box-con" key={hotel.id}>
              <div className="hotel-box-con-top">
                <img
                  src={`http://localhost:3001/Images/Hotel/${hotel.image}`}
                  alt="img"
                  className="hotelimg"
                />
              </div>
              <div className="hotel-box-con-btm">
                <div className="hotel-box-con-btm-left">
                  <div className="hotel-box-con-btm-title">
                    {hotel.name} {hotel.location}
                    {/* <span class="material-symbols-outlined">pin_drop</span> */}
                  </div>
                  <div>
                    <Rate
                      defaultValue={hotel.rating}
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
                  {hotel.roomType === 3 ? (
                    <span class="material-symbols-outlined">groups</span>
                  ) : hotel.roomType === 2 ? (
                    <span className="material-symbols-outlined">people</span>
                  ) : (
                    <span class="material-symbols-outlined">person</span>
                  )}
                  <h1> {hotel.price} LKR</h1>
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
