import React, { useState } from "react";
import "../../src/assets/css/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/common/Navbar";
import AboutUs from "../components/home/AboutUs";
import AboutGalle from "../components/home/AboutGalle";
import HomeBtm from "../components/home/HomeBtm";
import chatIcon from "../assets/images/chatbot-removebg-preview.png";
import HomeNav from "../components/home/HomeNav";
import OurSolution from "../components/home/OurSolution";
import Chatbot from "../components/common/Chatbot";
import { useNavigate } from "react-router-dom";
import Hotel from "../components/home/Hotel";
import Restaurant from "../components/home/Restaurant";
import ThingsdoinGalle from "./ThingsdoinGalle";
import FamousPlacesInGalle from "../components/home/FamousPlacesInGalle";

function Home() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [section, setSection] = useState("home");

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="home-main">
        <div className="home-img">
          <div className="img-con">
            <h1 className="img-con-second">Plan Your Awesome</h1>
            <h1 className="img-con-second">Trip Here</h1>
            <button
              className="hover-button"
              onClick={() => navigate("/UserChoise")}
            >
              Plan Your Trip Here
            </button>
          </div>
        </div>

        <div className="home-contain">
          <div className="home-contain-imputs">
            <HomeNav activeSection={section} setSection={setSection} />
          </div>
        </div>

        {section === "home" && (
          <div className="Aboutus-con-main">
            <AboutUs />
            <AboutGalle />
            <OurSolution />
            <img
              src={chatIcon}
              alt="chaticon"
              className="chatbotIcon"
              onClick={toggleChatbot}
            />
            {showChatbot && <Chatbot />}
            <FamousPlacesInGalle/>
            <HomeBtm />
          </div>
        )}

        {section === "hotels" && <Hotel />}

        {section === "restaurants" && <Restaurant />}

        {section === "thingsToDo" && (
          <div className="section-placeholder"><ThingsdoinGalle/></div>
          
        )}
      </div>
    </>
  );
}

export default Home;
