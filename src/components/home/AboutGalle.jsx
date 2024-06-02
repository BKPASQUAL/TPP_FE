import React from "react";
import "../../assets/css/AboutGalle.css";
import aboutIMg from "../../assets/images/Galle-Dutch-Fort-947x530.jpg";
import Button from 'react-bootstrap/Button';


function AboutGalle() {
  return (
    <div className="aboutGalle-main">
      <div className="aboutGalle-conatiner">
        {/* <div className="aboutGalle-header">About Galle Area</div> */}
        <div className="aboutGalle-mid">
          <div className="aboutGalle-mid-left">
            <div className="aboutGalle-header">About Galle Area</div>

            {/* <h1 className="aboutGalle-first-prg">
              Welcome to Our Website, your one-stop guide to the wonders of
              Galle!
            </h1> */}
            <p className="aboutGalle-second-prg">
              Discover the enchanting allure of Galle, where history whispers
              through cobbled streets and colonial architecture. Dive into a
              world where the past meets the present, and every corner reveals a
              tale of cultural richness and coastal charm. In Galle, vibrant
              markets beckon, pristine beaches await, and ancient forts stand as
              guardians of time, offering a glimpse into a bygone era amidst the
              gentle breeze of the Indian Ocean.
            </p>
            <Button variant="dark" className="aboutGallebtn">Read More</Button>

          </div>
          <div className="aboutGalle-mid-right">
            <img src={aboutIMg} alt="aboutGalleImg" className="aboutGalleimg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutGalle;
