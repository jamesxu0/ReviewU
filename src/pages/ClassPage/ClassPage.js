import React from "react";
import "./ClassPage.scss";
import NavBar from "./../../components/NavBar/NavBar";
import { useRouteMatch } from "react-router-dom";
import { numberToClassName } from "./../../utils/ClassUtils";

function ClassPage(classID) {
  const match = useRouteMatch();
  const classNumber = match.url.split("/").pop();
  return (
    <div className="classPage">
      <NavBar />

      {numberToClassName[classNumber.toUpperCase()] ? (
        <div>
          <h2 className="mainNumber">{classNumber.toUpperCase()}</h2>
          <h3 className="mainName">
            {numberToClassName[classNumber.toUpperCase()]}
          </h3>
        </div>
      ) : (
        <div>No class found</div>
      )}
    </div>
  );
}

export default ClassPage;
