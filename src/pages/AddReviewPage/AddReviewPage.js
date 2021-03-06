import React, { useState } from "react";
import "./AddReviewPage.scss";
// import NavBar from "./../../components/NavBar"
import ClassEntry from "./ClassEntry";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function AddReviewPage() {
  const options = ["Winter 2021", "Fall 2020", "Winter 2020"];
  const defaultOption = options[0];
  // let initialState = "Winter 2021";
  const [semester, setState] = useState(defaultOption);
  let ClassArray = [];

  return (
    <div>
      {/* <NavBar> */}
      <div className="select-semester">
        <p className="margin-right-20">Select Semester</p>
        <Dropdown
          className="padding-top-10"
          options={options}
          onChange={(option) => setState(option)}
          value={semester}
          placeholder="Select an option"
        />
      </div>
      <ClassEntry />
    </div>
  );
}

export default AddReviewPage;
