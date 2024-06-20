import React from "react";
import "../../assets/css/FamousPlacesInGalle.css";
import aboutIMg from "../../assets/images/istockphoto-1430069134-640x640.jpg";
import HikkaduwaCorrals from "../../assets/images/hikkaduwa-coral-reef.jpg";
import Hikkaduwabeach from "../../assets/images/Hikkaduwabeach.jpg";
import UnawatuBeach from "../../assets/images/Unawatuna.jpg";
import mirisscocontree from "../../assets/images/mirisscocontree.avif";
import GalleCrickeSataidam from "../../assets/images/GalleCrickeSataidam.jpg";
import YatagalaTemple from "../../assets/images/YatagalaTemple.jpg";
import DharmaplaPark from "../../assets/images/DharmaplaPark.jpg";

function FamousPlacesInGalle() {
  return (
    <div className="FamousPlace-main">
      <div className="FamousPlace-top">Famous Places In Galle Area</div>
      <div className="FamousPlace-mid">
        <div className="FamousPlace-mid-con">
          <div className="FamousPlace-mid-image-one">
            <div>
              <img src={aboutIMg} alt="aboutImg" className="FamousPlace-img" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <p> Galle Fort </p>
                <span
                  class="material-symbols-outlined"
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                >
                  arrow_circle_right
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="FamousPlace-mid-con">
          <div
            className="FamousPlace-mid-image-one"
            style={{ marginBottom: "70px" }}
          >
            <img
              src={HikkaduwaCorrals}
              alt="HikkaduwaCorrals"
              className="FamousPlace-img"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "space-between",
              }}
            >
              <p> Hikkaduwa Coral Reef </p>
              <span
                class="material-symbols-outlined"
                style={{ marginTop: "10px", marginLeft: "10px" }}
              >
                arrow_circle_right
              </span>
            </div>
          </div>
          <div className="FamousPlace-mid-image-one">
            <img
              src={Hikkaduwabeach}
              alt="Hikkaduwabeach"
              className="FamousPlace-img"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "space-between",
              }}
            >
              <p> Hikkaduwa Beach </p>
              <span
                class="material-symbols-outlined"
                style={{ marginTop: "10px", marginLeft: "10px" }}
              >
                arrow_circle_right
              </span>
            </div>
          </div>
        </div>
        <div className="FamousPlace-mid-con">
          <div
            className="FamousPlace-mid-image-one"
            style={{ marginTop: "100px" }}
          >
            <div className="FamousPlace-mid-image-one">
              <img
                src={UnawatuBeach}
                alt="UnawatuBeach"
                className="FamousPlace-img"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <p> Unawatuna Beach </p>
                <span
                  class="material-symbols-outlined"
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                >
                  arrow_circle_right
                </span>
              </div>
            </div>
          </div>
          <div
            className="FamousPlace-mid-image-one"
            style={{ marginTop: "70px" }}
          >
            <img
              src={mirisscocontree}
              alt="aboutImg"
              className="FamousPlace-img"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <p> Mirissa Coconut Hill </p>
              <span
                class="material-symbols-outlined"
                style={{ marginTop: "10px", marginLeft: "10px" }}
              >
                arrow_circle_right
              </span>
            </div>
          </div>
        </div>
        <div className="FamousPlace-mid-con">
          <div
            className="FamousPlace-mid-image-one"
            style={{ marginTop: "70px" }}
          >
            <img
              src={GalleCrickeSataidam}
              alt="GalleCrickeSataidam"
              className="FamousPlace-img"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <p> Galle International Stadium </p>
              <span
                class="material-symbols-outlined"
                style={{ marginTop: "10px", marginLeft: "10px" }}
              >
                arrow_circle_right
              </span>
            </div>
          </div>
        </div>
        <div className="FamousPlace-mid-con">
          <div
            className="FamousPlace-mid-image-one"
            style={{ marginBottom: "70px" }}
          >
            <img
              src={YatagalaTemple}
              alt="YatagalaTemple"
              className="FamousPlace-img"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <p> Yatagala Raja Maha Viharaya </p>
              <span
                class="material-symbols-outlined"
                style={{ marginTop: "10px", marginLeft: "10px" }}
              >
                arrow_circle_right
              </span>
            </div>
          </div>
          <div
            className="FamousPlace-mid-image-one"
            style={{ marginBottom: "170px" }}
          >
            <img
              src={DharmaplaPark}
              alt="DharmaplaPark"
              className="FamousPlace-img"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <p> Dharmapala Park Galle </p>
              <span
                class="material-symbols-outlined"
                style={{ marginTop: "10px", marginLeft: "10px" }}
              >
                arrow_circle_right
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FamousPlacesInGalle;
