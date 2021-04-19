/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from "react";
import "./MyAccountPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import "react-dropdown/style.css";
import ReactStars from "react-stars";
import { FaWindowClose } from "react-icons/fa";
import Context from "../../contexts/context";
import firebase from "firebase/app";
import "firebase/database";

function MyAccountPage() {
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(Context);

  function getReviews() {
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

  useEffect(() => {
    if (user) {
      getReviews();
    }
  }, [user]);

  return (
    <div className="classPage">
      <NavBar isHomePage={false} />
      {true ? (
        <div className="mainClassContainer">
          <div className="reviewsContainer">
            <h2>{reviews.length} Student Reviews</h2>
            {Object.entries(reviews).map(([sem_key, review_sem]) => {
              console.log(review_sem);
              return (
                <div
                  style={{
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                    padding: "10px 20px",
                    marginBottom: "40px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h2>
                      {sem_key} - {review_sem.overallRating.toFixed(1)}
                    </h2>
                    <FaWindowClose
                      size={32}
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        firebase
                          .database()
                          .ref("users/" + user.uid + "/reviews/" + sem_key)
                          .remove();
                        review_sem.classes.forEach((c) => {
                          firebase
                            .database()
                            .ref("class/" + c.class + "/" + user.uid)
                            .remove();
                        });
                        window.location.reload(false);
                      }}
                    />
                  </div>
                  <p>{review_sem.semesterComments}</p>
                  <div>
                    {review_sem["classes"].map((review, idx) => {
                      return (
                        <div className="review" key={"review" + idx}>
                          <div className="leftReview">
                            <p className="reviewAuthor">{review.class}</p>
                            <p className="reviewInfo">
                              Prof. {review.professor}
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
