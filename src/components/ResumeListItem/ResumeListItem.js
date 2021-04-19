import React from "react";
import { useState } from "react";
import "./ResumeListItem.scss";
import Modal from "react-modal";

function ResumeListItem(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  // get resume preview, resume owner, and owners uploaded note/message
  return (
    <div className="resumeListItem">
      <h2>{props.name}</h2>
      <h2>{props.note}</h2>
      <button onClick={openModal}>Open Resume</button>
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName="modalOverlay"
        contentLabel="Full Semester Review"
      >
        <embed src={props.url} width="1200px" height="1200px" />
      </Modal> */}
    </div>
  );
}

export default ResumeListItem;
