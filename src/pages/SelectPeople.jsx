import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import { Progress } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/SelectPeople.css";
import WithFriend from "../components/SelectPeople/WithFriend";
import WithFamilly from "../components/SelectPeople/WithFamilly";
import Button from "react-bootstrap/Button";
import chatIcon from "../assets/images/chatbot-removebg-preview.png";
import Chatbot from "../components/common/Chatbot";
import { useNavigate } from "react-router-dom";

function SelectPeople() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("");
  const handleBtnSelect = (buttonId) => {
    setActiveButton(buttonId);
  };

  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="SelectPeople-main">
      <Navbar />
      <Progress.Line percent={40} showInfo={false} style={{ padding: "0" }} />
      <div className="planetrip-SelectPeople-top">
        <p className="planetrip-SelectPeople-title">
          How many people travel with you?
        </p>
      </div>
      <div className="planetrip-SelectPeople-mid">
        <div className="planetrip-SelectPeople-mid-left">
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            onClick={() => navigate("/Planetrip")}
          />
        </div>
        <div>
          <div className="planetrip-SelectPeople-mid-mid">
            <div className="planetrip-SelectPeople-mid-box">
              <button
                className={`${activeButton === "Solo" ? "active" : ""}`}
                onClick={() => handleBtnSelect("Solo")}
              >
                <span class="material-symbols-outlined planetrip-SelectPeople-icons">
                  person
                </span>
                <p> Solo Trip</p>
              </button>
            </div>
            <div className="planetrip-SelectPeople-mid-box">
              <button
                className={`${activeButton === "Partner" ? "active" : ""}`}
                onClick={() => handleBtnSelect("Partner")}
              >
                <span class="material-symbols-outlined planetrip-SelectPeople-icons">
                  partner_exchange
                </span>
                <p>With Partner</p>
              </button>
            </div>
            <div className="planetrip-SelectPeople-mid-box">
              <button
                className={`${activeButton === "Friends" ? "active" : ""}`}
                onClick={() => handleBtnSelect("Friends")}
              >
                <span class="material-symbols-outlined planetrip-SelectPeople-icons">
                  groups
                </span>
                <p>With Friends</p>
              </button>
            </div>
            <div className="planetrip-SelectPeople-mid-box">
              <button
                className={`${activeButton === "Family" ? "active" : ""}`}
                onClick={() => handleBtnSelect("Family")}
              >
                <span class="material-symbols-outlined planetrip-SelectPeople-icons">
                  family_restroom
                </span>
                <p>With Family</p>
              </button>
            </div>
            <div className="planetrip-SelectPeople-mid-box">
              <button
                className={`${activeButton === "Other" ? "active" : ""}`}
                onClick={() => handleBtnSelect("Other")}
              >
                <span class="material-symbols-outlined planetrip-SelectPeople-icons">
                  language
                </span>
                <p>Other</p>
              </button>
            </div>
          </div>
        </div>

        <div className="planetrip-SelectPeople-mid-right">
          <FontAwesomeIcon icon={faCircleArrowRight} onClick={() => navigate("/userreq")}/>
        </div>
      </div>
      <div className="planetrip-SelectPeople-btm">
        {activeButton === "Friends" && <WithFriend />}
        {activeButton === "Family" && <WithFamilly />}
      </div>
      <div className="SelectPeople-btn">
        <Button variant="dark" style={{ width: "150px" }} onClick={() => navigate("/CreatePackage")} >
          Next
        </Button>
      </div>
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

export default SelectPeople;
