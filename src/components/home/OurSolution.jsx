import React from "react";
import "../../assets/css/AboutUs.css";
import aboutIMg from "../../assets/images/istockphoto-1430069134-640x640.jpg";
import Button from "react-bootstrap/Button";

function OurSolution() {
  return (
    <div className="about-main">
      <div className="about-conatiner">
        {/* <div className="about-header">About Us</div> */}
        <div className="about-mid">
          <div className="about-mid-left">
            <img src={aboutIMg} alt="aboutImg" className="aboutimg" />
          </div>
          <div className="about-mid-right">
            <h1 className="about-first-prg">
              <div className="about-header">Our Solution</div>
            </h1>
            <p className="about-third-prg">
              Our solution goes beyond conventional travel guides. With our
              customized chatbot, we offer tailored travel plans specifically
              designed for exploring the Galle area. Whether you're seeking
              adventure or relaxation, our chatbot will curate the perfect
              itinerary just for you.
            </p>
            <Button variant="dark" className="aboutUsbtn">
              Read More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurSolution;
