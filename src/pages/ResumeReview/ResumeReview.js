import React from "react";
import "./ResumeReview.scss";
import { useContext, useEffect, useState } from "react";
import "firebase/storage";
import NavBar from "./../../components/NavBar/NavBar";
import { FilePicker } from "react-file-picker";
import Context from "./../../contexts/context";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import { FaFileUpload } from "react-icons/fa";
import Modal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

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
  const [resumeUploadComments, setResumeUploadComments] = useState("");

  const [selectedID, setSelectedID] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(resumes);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
    setResumeComments("");
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

  const handleUpload = () => {
    const uploadTask = storage.ref(user.uid).put(selectedFile);
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
              .set({
                url: url,
                displayName: user.displayName,
                comments: [],
                requestComments: resumeUploadComments,
              });
          })
          .then(() => {
            window.location.reload(false);
          });
      }
    );
  };

  const handleCommentUpload = () => {
    const pastComments = resumes[selectedID].comments ?? [];
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
        contentLabel="Full Semester Review"
      >
        <FaWindowClose
          size={28}
          style={{ cursor: "pointer", float: "right", paddingTop: "-15px" }}
          onClick={() => {
            closeModal();
          }}
        />
        <div style={{ display: "flex" }}>
          <embed src={selectedResume} width="750px" height="800" />
          <div
            style={{
              paddingLeft: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {resumes[selectedID]?.requestComments && (
              <p>{resumes[selectedID]?.requestComments}</p>
            )}
            <h2>Comments:</h2>
            <textarea
              className="resumeComments"
              placeholder="Add your resume comment..."
              value={resumeComments}
              style={{ width: "400px", resize: "none" }}
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
      <div className="reviewContainer">
        <h1>Resume Review</h1>
        <div style={{ display: "flex" }}>
          <FilePicker
            extensions={["pdf"]}
            onChange={(fileObject) => {
              console.log(fileObject.name);
              setSelectedFile(fileObject);
            }}
            onError={(errMsg) => {}}
          >
            <a className="uploadButton" role="button" href="#">
              <span>Select</span>
              <div className="icon">
                <FaFileUpload size={32} />
              </div>
            </a>
          </FilePicker>
          {selectedFile && (
            <a
              className="submitButton"
              role="button"
              href="#"
              onClick={handleUpload}
            >
              <span>Submit</span>
              <div className="icon">
                <FaCheckCircle size={32} />
              </div>
            </a>
          )}
        </div>
        {selectedFile && (
          <div>
            <p>{selectedFile.name}</p>
            <textarea
              className="resumeUploadComments"
              placeholder="Add some comments about your resume..."
              value={resumeUploadComments}
              style={{ width: "400px", resize: "none" }}
              onChange={(e) => setResumeUploadComments(e.target.value)}
            />
          </div>
        )}
        <div className="resumeList">
          {Object.entries(resumes).map((resume) => (
            <div className="resumeListItem">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2>{resume[1].displayName}</h2>
                <button
                  style={{ height: "30px" }}
                  onClick={() => {
                    openModal();
                    setSelectedResume(resume[1].url);
                    setSelectedID(resume[0]);
                  }}
                >
                  Open Resume
                </button>
              </div>
              <p>{resume[1].requestComments}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResumeReview;
