/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import "./MyAccountPage.scss";
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

function AddReviewPage() {
  const { user } = useContext(Context);
  const options = [
    "Winter 2021",
    "Fall 2020",
    "Winter 2020",
    "Fall 2019",
    "Winter 2019",
    "Fall 2018",
  ];
  const [semester, setState] = useState(options[0]);
  const [entries, setEntries] = useState([
    {
      class: "",
      professor: "",
      workload: 0,
      quality: 0,
      usefulness: 0,
      comment: "",
    },
  ]);
  const handleSubmitEntry = () => {
    firebase
      .database()
      .ref("users/" + user.uid + "/reviews/" + semester)
      .set(entries);
    entries.forEach((entry) => {
      console.log("h");
      entry.authorName = user.displayName;
      entry.authorID = user.uid;
      entry.semester = semester;
      firebase
        .database()
        .ref("class/" + entry.class + "/")
        .push(entry);
    });
  };
  const handleAddEntry = () => {
    setEntries([
      ...entries,
      {
        class: "",
        professor: "",
        workload: 0,
        quality: 0,
        usefulness: 0,
        comment: "",
      },
    ]);
    setTimeout(() => {
      window.scroll({
        top: document.body.offsetHeight,
        left: 0,
        behavior: "smooth",
      });
    }, 0);
  };
  const handleRemoveEntry = () => {
    setEntries(entries.slice(0, entries.length - 1));
  };
  function renderMenu(items, value, style) {
    return value === "" ? (
      <div></div>
    ) : (
      <div
        style={{
          ...style,
          ...this.menuStyle,
          maxHeight: "300px",
          zIndex: 2,
        }}
        children={items}
      />
    );
  }
  return (
    <div>
      <NavBar />
      <div className="select-semester">
        <p className="account-heading">Welcome James</p>
      </div>
      <div className="entryContainer">
        {entries.map((entry, idx) => {
          return (
            <div className="entry" key={"entry" + idx}>
              <div className="leftEntry">
                <p>
                  <input
                    value={entry.professor}
                    onChange={(e) => {
                      entries[idx].professor = e.target.value;
                      setEntries([...entries]);
                    }}
                    className="searchbar"
                    placeholder={"Professor"}
                  />
                </p>
                <div>
                  Workload
                  <ReactStars
                    count={5}
                    value={entries[idx].workload}
                    onChange={(rating) => {
                      entries[idx].workload = rating;
                      setEntries([...entries]);
                    }}
                    size={36}
                    color2={"#ffd700"}
                  />
                </div>
                <div>
                  Quality
                  <ReactStars
                    count={5}
                    value={entries[idx].quality}
                    onChange={(rating) => {
                      entries[idx].quality = rating;
                      setEntries([...entries]);
                    }}
                    size={36}
                    color2={"#ffd700"}
                  />
                </div>
                <div>
                  Usefulness
                  <ReactStars
                    count={5}
                    value={entries[idx].usefulness}
                    onChange={(rating) => {
                      entries[idx].usefulness = rating;
                      setEntries([...entries]);
                    }}
                    size={36}
                    color2={"#ffd700"}
                  />
                </div>
              </div>
              <textarea
                value={entries[idx].comment}
                onChange={(e) => {
                  entries[idx].comment = e.target.value;
                  setEntries([...entries]);
                }}
                className="mainInput"
                placeholder="Enter a comment..."
              />
            </div>
          );
        })}
      </div>
      <div className="buttonContainer">
        <a
          onClick={handleAddEntry}
          className="addButton"
          href="#"
          role="button"
        >
          <span>add</span>
          <div className="icon">
            <FaPlusCircle size={32} />
          </div>
        </a>
        {entries.length > 1 && (
          <a onClick={handleRemoveEntry} className="removeButton" role="button">
            <span>remove</span>
            <div className="icon">
              <FaMinusCircle size={32} />
            </div>
          </a>
        )}
        <a
          onClick={handleSubmitEntry}
          className="submitButton"
          href="#"
          role="button"
        >
          <span>Submit</span>
          <div className="icon">
            <FaCheckCircle size={32} />
          </div>
        </a>
      </div>
    </div>
  );
}

export default AddReviewPage;
