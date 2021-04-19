import React from "react";
// import "./ResumeReview.css";
import { useContext, useEffect, useState } from "react";
import "firebase/storage";
import NavBar from "./../../components/NavBar/NavBar";
import { FilePicker } from "react-file-picker";
import Context from "./../../contexts/context";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import Modal from "react-modal";

const customStyles = {
  content: {
    width: "1200px",
    height: "800px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
  },
};

function ResumeReview() {
  let storage = firebase.storage();
  const { user } = useContext(Context);
  const [resumes, setResumes] = useState({});
  const [selectedResume, setSelectedResume] = useState("");
  const [resumeComments, setResumeComments] = useState("");
  const [selectedID, setSelectedID] = useState("");
  console.log(resumes);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    firebase
      .database()
      .ref("resumes")
      .get()
      .then(function (snapshot) {
        if (snapshot.exists()) {
          setResumes(snapshot.val());
        } else {
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleUpload = (fileObj) => {
    const uploadTask = storage.ref(user.uid).put(fileObj);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref(user.uid)
          .getDownloadURL()
          .then((url) => {
            firebase
              .database()
              .ref("resumes/" + user.uid)
              .set({ url: url, displayName: user.displayName, comments: [] });
          });
      }
    );
  };

  const handleCommentUpload = () => {
    console.log("this is the comment: " + resumeComments);
    console.log(selectedID);
    const pastComments = resumes[selectedID].comments ?? [];
    // resumeCon

    const resumeRef = firebase.database().ref("resumes/" + selectedID);

    resumeRef.set({
      ...resumes[selectedID],
      comments: [
        ...pastComments,
        { displayName: user.displayName, comment: resumeComments },
      ],
    });

    resumeRef.once("value").then((snapshot) => {
      if (snapshot.exists()) {
        resumes[selectedID] = snapshot.val();
        console.log("test", resumes);
        setResumes({ ...resumes });
      }
    });
  };

  return (
    <div className="resumeReviewPage">
      <NavBar isHomePage={false} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName="modalOverlay"
        contentLabel="Full Semester Review"
      >
        <div style={{ display: "flex" }}>
          <embed src={selectedResume} width="750px" height="800" />
          <div
            style={{
              paddingLeft: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2>Comments:</h2>
            <textarea
              className="resumeComments"
              placeholder="Add your resume comment..."
              value={resumeComments}
              style={{ width: "400px" }}
              onChange={(e) => setResumeComments(e.target.value)}
            />
            <button onClick={handleCommentUpload}>Submit Comment</button>
            <div className="comments">
              {resumes[selectedID]?.comments &&
                resumes[selectedID]?.comments.map((comment) => {
                  return (
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        {comment.displayName}:
                      </span>{" "}
                      {comment.comment}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
      </Modal>
      <h2>Resume Review</h2>
      <FilePicker
        extensions={["pdf"]}
        onChange={(fileObject) => {
          handleUpload(fileObject);
        }}
        onError={(errMsg) => {}}
      >
        <button>Click to upload resume</button>
      </FilePicker>
      <div className="resumeList">
        {Object.entries(resumes).map((resume) => (
          <div className="resumeListItem">
            <h2>{resume[1].displayName}</h2>
            <button
              onClick={() => {
                openModal();
                setSelectedResume(resume[1].url);
                setSelectedID(resume[0]);
              }}
            >
              Open Resume
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResumeReview;
