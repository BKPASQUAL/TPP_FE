import React from "react";
import "../../assets/css/HomeNav.css";
import { useNavigate } from "react-router-dom";

function HomeNav({ activeSection, setSection }) {
  const navigate = useNavigate();

  const handleBtnSelect = (section) => {
    setSection(section);
  };

  return (
    <div className="homenav-main">
      <div>
        <button
          variant="outline-dark"
          className={`homenav-btn1 btn btn-outline-dark ${activeSection === "home" ? "active" : ""}`}
          onClick={() => handleBtnSelect("home")}
        >
          Home
        </button>
      </div>
      <div>
        <button
          variant="outline-dark"
          className={`homenav-btn1 btn btn-outline-dark ${activeSection === "hotels" ? "active" : ""}`}
          onClick={() => handleBtnSelect("hotels")}
        >
          Hotels
        </button>
      </div>
      <div>
        <button
          variant="outline-dark"
          className={`homenav-btn1 btn btn-outline-dark ${activeSection === "restaurants" ? "active" : ""}`}
          onClick={() => handleBtnSelect("restaurants")}
        >
          Restaurants
        </button>
      </div>
      <div>
        <button
          variant="outline-dark"
          className={`homenav-btn1 btn btn-outline-dark ${activeSection === "thingsToDo" ? "active" : ""}`}
          onClick={() => handleBtnSelect("thingsToDo")}
        >
          Things To Do
        </button>
      </div>
      <div>
        <button
          variant="dark"
          className="homenav-btn1 btn btn-outline-dark"
          onClick={() => navigate("/Planetrip")}
        >
          Plan Tour trip with AI
        </button>
      </div>
    </div>
  );
}

export default HomeNav;
