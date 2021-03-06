import React from "react";
import "./NavBar.scss";

function NavBar(isHomePage) {
  let homeRedirect;
  let searchBar;
  if (!isHomePage) {
    // homeRedirect = <button> to navigate back to the home page
    // searchBar = <ClassSearchBar> component
  }
  return (
    <div className="NavBar">
      {homeRedirect}
      {searchBar}
      {/* Logout Button */}
      {/* My Account Button */}
    </div>
  );
}

export default NavBar;
