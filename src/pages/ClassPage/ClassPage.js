import React, { useEffect, useState } from "react";
import "./ClassPage.scss";
import NavBar from "./../../components/NavBar/NavBar";
import { useRouteMatch } from "react-router-dom";
import { numberToClassName } from "./../../utils/ClassUtils";
import firebase from "firebase/app";
import "firebase/database";
import ReactStars from "react-stars";
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

function ClassPage() {
  const match = useRouteMatch();
  const classNumber = match.url.split("/").pop();
  const [reviews, setReviews] = useState([]);
  const [fullReview, setFullReview] = useState({});
  useEffect(() => {
    if (numberToClassName[classNumber.toUpperCase()]) {
      firebase
        .database()
        .ref("class/" + classNumber.toUpperCase() + "/")
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

  let totalWorkload = 0;
  let totalQuality = 0;
  let totalUsefulness = 0;

  reviews.forEach((review) => {
    totalWorkload += review.workload;
    totalQuality += review.quality;
    totalUsefulness += review.usefulness;
  });

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal(authorID, semester) {
    return () => {
      setIsOpen(true);
      firebase
        .database()
        .ref("users/" + authorID + "/reviews/" + semester)
        .get()
        .then(function (snapshot) {
          if (snapshot.exists()) {
            setFullReview(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="classPage">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Full Semester Review"
      >
        {JSON.stringify(fullReview)}
        <button onClick={closeModal}>close</button>
      </Modal>
      <NavBar isHomePage={false} />
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
                value={totalWorkload / reviews.length}
                size={36}
                color2={"#ffd700"}
              />
            </div>
            <div>
              <h2>Quality</h2>
              <ReactStars
                edit={false}
                count={5}
                value={totalQuality / reviews.length}
                size={36}
                color2={"#ffd700"}
              />
            </div>
            <div>
              <h2>Usefulness</h2>
              <ReactStars
                edit={false}
                count={5}
                value={totalUsefulness / reviews.length}
                size={36}
                color2={"#ffd700"}
              />
            </div>
          </div>
          <div className="reviewsContainer">
            <h2>{reviews.length} Student Reviews</h2>
            {reviews.map((review, idx) => {
              return (
                <div className="review" key={"review" + idx}>
                  <div className="leftReview">
                    <p className="reviewAuthor">{review.authorName}</p>
                    <p className="reviewInfo">
                      {review.professor} ({review.semester})
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
                  <button
                    onClick={openModal(review.authorID, review.semester)}
                    className="reviewExpand"
                  >
                    View full semester
                  </button>
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
