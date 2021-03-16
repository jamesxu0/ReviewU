import React from "react";
import "./HomePage.scss";
import NavBar from "./../../components/NavBar/NavBar";
import SearchBar from "./../../components/SearchBar/SearchBar";
import { useHistory } from "react-router-dom";

function HomePage() {
  const history = useHistory();
  const handleAddReviewsClick = () => {
    history.push("/add");
  };
  
  return (
    <div>
      <NavBar isHomePage={true}/>
      <div className="mainContainer">
        <h2 className="mainTitle">ReviewU</h2>
        <SearchBar />
        <h2 className="add-reviews" onClick={handleAddReviewsClick}>
          Add Reviews
        </h2>
      </div>
    </div>
  );
}

export default HomePage;
