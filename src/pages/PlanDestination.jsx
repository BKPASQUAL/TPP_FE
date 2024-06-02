import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import "../assets/css/PlanDestination.css";
import { Progress } from "rsuite";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Chatbot from "../components/common/Chatbot";
import chatIcon from "../assets/images/chatbot-removebg-preview.png";
import HomeBtm from "../components/home/HomeBtm";
import { useNavigate } from "react-router-dom";

function PlanDestination() {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="plantrip-main">
      <Navbar />
      <Progress.Line percent={20} showInfo={false} style={{ padding: "0" }} />
      <div className="planetrip-destination-btn">
        {/* <Button variant="dark" className="planetrip-btn">
          Previues
        </Button>
        <Button variant="dark" className="planetrip-btn">
          Next
        </Button> */}
      </div>
      <div className="planetrip-destination-top">
        <p className="planetrip-destination-title">
          Where do you want to go in the Galle area?
        </p>
      </div>
      <div className="planetrip-destination-pop">
        <h3>Popular destinations in Galle Area</h3>
      </div>
      <div className="planetrip-destination-mid">
        <div className="planetrip-destination-mid-left">
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            onClick={() => navigate("/")}
          />
        </div>
        <div className="planetrip-destination-mid-mid">
          <div className="planetrip-destination-mid-mid-con">
            <div className="planetrip-destination-mid-box1">Galle</div>
            <div className="planetrip-destination-mid-box2">Hikkaduwa</div>
            <div className="planetrip-destination-mid-box3">Unawatuna</div>
            <div className="planetrip-destination-mid-box4">Kottawa</div>
          </div>
          <div style={{display:"flex" , justifyContent:"flex-end" , marginTop:"10px"}}>
            <Button
              variant="dark"
              style={{ width: "150px" }}
              onClick={() => navigate("/SelectPeople")}
            >
              Next
            </Button>
          </div>
        </div>
        <div className="planetrip-destination-mid-right">
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            onClick={() => navigate("/SelectPeople")}
          />
        </div>
      </div>
      <div className="SelectPeople-btn"></div>
      <img
        src={chatIcon}
        alt="chaticon"
        // className="chatbotIcon-destination"
        className="chatbotIcon"
        onClick={toggleChatbot}
      />
      {showChatbot && <Chatbot />}
      <div className="plantrip-btm"></div>
      </div>
  );
}

export default PlanDestination;
