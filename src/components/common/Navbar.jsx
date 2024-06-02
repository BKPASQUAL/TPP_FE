import React from "react";
import "../../assets/css/Navbar.css";
import { Input, InputGroup } from "rsuite";
import SearchIcon from '@rsuite/icons/Search';


function Navbar() {
  return (
    <div className="navbar-main">
      <div className="navbar-con">
        <div className="navbar-con-left">
          <h1>About</h1>
          <h1> Trip Planner </h1>
        </div>
        <div className="navbar-con-mid">
          <InputGroup inside style={{ width: "500px", marginTop : "8px"}}>
            <Input placeholder="Search" />
            <InputGroup.Button>
              <SearchIcon />
            </InputGroup.Button>
          </InputGroup>
        </div>
        <div className="navbar-con-right">
          <h1>Account</h1>
          <h1>Sign In</h1> {/* Fixed typo in "Sign In" */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
