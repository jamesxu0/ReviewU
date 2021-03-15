import React, { useEffect, useState } from "react";
import "./ClassPage.scss";
import NavBar from "./../../components/NavBar/NavBar";
import { useRouteMatch } from "react-router-dom";
import { numberToClassName } from "./../../utils/ClassUtils";
import firebase from "firebase/app";
import "firebase/database";
import ReactStars from "react-stars";

function ClassPage(classID) {
  const match = useRouteMatch();
  const classNumber = match.url.split("/").pop();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (numberToClassName[classNumber.toUpperCase()]) {
      firebase
        .database()
        .ref("class/" + classNumber + "/")
        .get()
        .then(function (snapshot) {
          if (snapshot.exists()) {
            setReviews(Object.values(snapshot.val()));
          } else {
            console.log("No data available");
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className="classPage">
      <NavBar />
      {numberToClassName[classNumber.toUpperCase()] ? (
        <div className="mainClassContainer">
          <h2 className="mainNumber">{classNumber.toUpperCase()}</h2>
          <h3 className="mainName">
            {numberToClassName[classNumber.toUpperCase()]}
          </h3>
          <div className="starsContainer">
            <div>
              <h2>Workload</h2>
              <ReactStars
                edit={false}
                count={5}
                value={4}
                size={36}
                color2={"#ffd700"}
              />
            </div>
            <div>
              <h2>Quality</h2>
              <ReactStars
                edit={false}
                count={5}
                value={4}
                size={36}
                color2={"#ffd700"}
              />
            </div>
            <div>
              <h2>Usefulness</h2>
              <ReactStars
                edit={false}
                count={5}
                value={4}
                size={36}
                color2={"#ffd700"}
              />
            </div>
          </div>
          <div className="reviewsContainer">
            <h2>{reviews.length} Student Reviews</h2>
            {reviews.map((review) => {
              return (
                <div className="review">
                  <p>
                    <span className="reviewAuthor">{review.authorName}</span> -{" "}
                    {review.professor}
                  </p>
                  <div className="reviewStarsContainer">
                    <div>
                      <h2>Workload</h2>
                      <ReactStars
                        edit={false}
                        count={5}
                        value={4}
                        size={36}
                        color2={"#ffd700"}
                      />
                    </div>
                    <div>
                      <h2>Quality</h2>
                      <ReactStars
                        edit={false}
                        count={5}
                        value={4}
                        size={36}
                        color2={"#ffd700"}
                      />
                    </div>
                    <div>
                      <h2>Usefulness</h2>
                      <ReactStars
                        edit={false}
                        count={5}
                        value={4}
                        size={36}
                        color2={"#ffd700"}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>No class found</div>
      )}
    </div>
  );
}

export default ClassPage;
