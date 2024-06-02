import React from "react";
import "../../assets/css/AboutUs.css";
import aboutIMg from "../../assets/images/istockphoto-1430069134-640x640.jpg";
import Button from 'react-bootstrap/Button';

function AboutUs() {
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
            <div className="about-header">About Us</div>
              Welcome to Our Website, your one-stop guide to the wonders
              of Galle!
            </h1>
            <p className="about-second-prg"> Discover all the treasures of the Galle area right here. From historical landmarks to hidden gems, we've got everything you need to make your Galle experience unforgettable. </p>
            <Button variant="dark" className="aboutUsbtn">Read More</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
