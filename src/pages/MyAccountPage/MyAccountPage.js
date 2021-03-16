/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from "react";
import "./MyAccountPage.scss";
import { useRouteMatch } from "react-router-dom";
import { numberToClassName } from "./../../utils/ClassUtils";
import NavBar from "../../components/NavBar/NavBar";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import ReactStars from "react-stars";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import Autocomplete from "react-autocomplete";
import { allClasses } from "../../utils/ClassUtils";
import Context from "../../contexts/context";
import firebase from "firebase/app";
import "firebase/database";
import Modal from "react-modal";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function MyAccountPage() {
  const [reviews, setReviews] = useState([]);
  const [fullReview, setFullReview] = useState({});
  const { user, signInWithGoogle } = useContext(Context);
  
  useEffect(() => {
    // console.log("ASDFASDFASDFASDFASDF");
    // console.log(user);
    if (user) {
      firebase
      .database()
      .ref("users/" + user.uid + "/reviews/")
      .get()
      .then(function (snapshot) {
        if (snapshot.exists()) {
          setReviews(snapshot.val());
          console.log("snapshot exists");
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
    }
    
  }, [user]);

  return (
    <div className="classPage">
      <NavBar isHomePage={false}/>
      {true ? (
        <div className="mainClassContainer">
          <div className="reviewsContainer">
            <h2>{reviews.length} Student Reviews</h2>
            {Object.entries(reviews).map(([sem_key, review_sem]) => {
              return (
                <div>
                  <div>Reviews for: {sem_key}</div>
                  <br></br>
                  <div>
                  {review_sem["classes"].map((review, idx) => {
              return (
                <div className="review" key={"review" + idx}>
                  {/* <div>Semester: {review[0].classes[0]}</div> */}
                  <div className="leftReview">
                    <p className="reviewAuthor">{review.class}</p>
                    <p className="reviewInfo">
                      Prof. {review.professor} ({sem_key})
                    </p>
                    <div className="reviewStarsContainer">
                      <div className="starContainer">
                        <h2>Workload</h2>
                        <ReactStars
                          edit={false}
                          count={5}
                          value={review.workload}
                          size={28}
                          color2={"#ffd700"}
                        />
                      </div>
                      <div className="starContainer">
                        <h2>Quality</h2>
                        <ReactStars
                          edit={false}
                          count={5}
                          value={review.quality}
                          size={28}
                          color2={"#ffd700"}
                        />
                      </div>
                      <div className="starContainer">
                        <h2>Usefulness</h2>
                        <ReactStars
                          edit={false}
                          count={5}
                          value={review.usefulness}
                          size={28}
                          color2={"#ffd700"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rightReview">
                    <h2>Feedback:</h2>
                    <p>{review.comment}</p>
                  </div>
                </div>
              );
            })}
                  </div>
                </div>
              );
            })}
            
          </div>
        </div>
      ) : (
        <div>No entries found</div>
      )}
    </div>
  );
}

export default MyAccountPage;
