import React, { useState } from 'react';
import '../../assets/css/Hotel.css';
import { useGetHotelList1Query, useGetHotelList2Query } from '../../store/api/hotelApi';
import { Rate, SelectPicker } from 'rsuite';
import HomeBtm from './HomeBtm';
import Chatbot from '../common/Chatbot';
import chatIcon from '../../assets/images/chatbot-removebg-preview.png';

function Hotel() {
  const { data: hotelsData1, error: error1, isLoading: isLoading1 } = useGetHotelList1Query();
  const { data: hotelsData2, error: error2, isLoading: isLoading2 } = useGetHotelList2Query();
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  if (isLoading1 || isLoading2) return <p>Loading...</p>;
  if (error1 || error2) return <p>Error loading hotels</p>;

  const combinedHotelsData = [...(hotelsData1 || []), ...(hotelsData2 || [])];

  return (
    <>
      <div className="hotel-main">
        <div className="hotel-main-top">
          <div className="hotel-main-title">Hotels And Villas In Galle Area</div>
        </div>
        <div className="hotel-main-btm">
          <SelectPicker
            searchable={false}
            style={{ width: 224, marginRight: '25px' }}
            placeholder="Hotel or Villa"
          />
          <SelectPicker
            searchable={false}
            style={{ width: 224, marginRight: '25px' }}
            placeholder="Room Type"
          />
          <SelectPicker
            searchable={false}
            style={{ width: 224, marginRight: '25px' }}
            placeholder="Location"
          />
          <SelectPicker
            searchable={false}
            style={{ width: 224, marginRight: '25px' }}
            placeholder="Price"
          />
        </div>
        <div className="hotels">All Hotels In Galle Area</div>
        <div className="hotel-con">
          {combinedHotelsData.map((hotel) => (
            <div className="hotel-box-con" key={hotel.name}>
              <div className="hotel-box-con-top">
                <img src={hotel.image} alt="img" className="hotelimg" />
              </div>
              <div className="hotel-box-con-btm">
                <div className="hotel-box-con-btm-left">
                  <div className="hotel-box-con-btm-title">
                    {hotel.name} {hotel.address.region}
                  </div>
                  <div>
                    <Rate
                      defaultValue={hotel.rating}
                      style={{
                        width: '80px',
                        fontSize: '12px',
                        marginBottom: '0px',
                        color: 'black',
                      }}
                      allowHalf
                      readOnly
                    />
                  </div>
                </div>
                <div className="hotel-box-con-btm-right">
                  <span className="material-symbols-outlined">person</span>
                  <h1>N/A LKR</h1>
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
