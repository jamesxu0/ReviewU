import React, { useState } from "react";
import "./AddReviewPage.scss";
// import ClassEntry from "./ClassEntry"

function ClassEntry() {
  const [state, setState] = useState("");
  return (
    <div>
      <div className="class-entry">
        <p className="margin-right-20">Select Component</p>
      </div>
    </div>
  );
}

export default ClassEntry;
