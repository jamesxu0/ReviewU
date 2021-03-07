import React, { useState } from "react";
import "./AddReviewPage.scss";
// import ClassEntry from "./ClassEntry"

function ClassEntry() {
  const [className, setClassName] = useState("");
  const [reviewText, setReviewText] = useState("");
  return (
    <div className="class-split">
      <div className="class-name-rating">
        <label>
          Type a Class
          <input
            type="text"
            value={className}
            onChange={(event) => setClassName(event.target.value)}
          />
        </label>
        <div>Insert Star Rating Here</div>
      </div>
      <div className="class-review">
        <label>
          My Review
          <input
            className="review-text"
            type="text"
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default ClassEntry;
