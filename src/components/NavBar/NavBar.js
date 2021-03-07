import React from "react";
import "./NavBar.scss";
import { FaHome } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Context from "./../../contexts/context";
import { useContext } from "react";

function NavBar(isHomePage) {
  const history = useHistory();
  const { signOut } = useContext(Context);
  const handleHomeClick = () => {
    history.push("/");
  };
  return (
    <div className="navbar">
      <FaHome onClick={handleHomeClick} size={60} className="homeIcon" />
      <div className="nav-items">
        <h2>My Account</h2>
        <h2
          onClick={() => {
            signOut();
          }}
          style={{ cursor: "pointer" }}
        >
          Logout
        </h2>
      </div>
    </div>
  );
}

export default NavBar;
