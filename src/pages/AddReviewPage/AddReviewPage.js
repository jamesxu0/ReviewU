/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import "./AddReviewPage.scss";
import NavBar from "./../../components/NavBar/NavBar";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import ReactStars from "react-stars";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import Autocomplete from "react-autocomplete";
import { allClasses } from "./../../utils/ClassUtils";
import Context from "./../../contexts/context";
import firebase from "firebase/app";
import "firebase/database";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

function AddReviewPage() {
  const history = useHistory();
  const { addToast } = useToasts();
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
  const [semesterComments, setSemesterComments] = useState("");
  const [overallRating, setOverallRating] = useState(0);
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
    for (let x = 0; x < entries.length; ++x) {
      if (entries[x].class === "") {
        addToast("Missing class name", {
          appearance: "error",
        });
        return;
      }
    }
    firebase
      .database()
      .ref("users/" + user.uid + "/reviews/" + semester)
      .set({
        overallRating,
        semesterComments,
        classes: entries,
      });
    entries.forEach((entry) => {
      entry.authorName = user.displayName;
      entry.authorID = user.uid;
      entry.semester = semester;
      firebase
        .database()
        .ref("class/" + entry.class + "/")
        .set({ [user.uid]: entry });
    });
    history.push("/");
    addToast("Review successfully saved", {
      appearance: "success",
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
      <div className="semesterContainer">
        <div className="selectContainer">
          <p className="select-text">Select Semester</p>
          <Dropdown
            options={options}
            onChange={(option) => setState(option.value)}
            value={semester}
          />
        </div>
        <div className="overallContainer">
          Overall
          <ReactStars
            count={5}
            value={overallRating}
            onChange={(rating) => setOverallRating(rating)}
            size={36}
            color2={"#ffd700"}
          />
        </div>
      </div>
      <textarea
        className="semesterComments"
        placeholder="Semester comments..."
        value={semesterComments}
        onChange={(e) => setSemesterComments(e.target.value)}
      />
      <div className="entryContainer">
        {entries.map((entry, idx) => {
          return (
            <div className="entry" key={"entry" + idx}>
              <div className="leftEntry">
                <Autocomplete
                  getItemValue={(item) => item}
                  items={allClasses}
                  renderItem={(item, isHighlighted) => (
                    <div
                      style={{
                        background: isHighlighted ? "lightgray" : "white",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "16px",
                      }}
                    >
                      {item}
                    </div>
                  )}
                  selectOnBlur={true}
                  value={entries[idx].class}
                  onChange={(e) => {
                    entries[idx].class = e.target.value;
                    setEntries([...entries]);
                  }}
                  onSelect={(val) => {
                    entries[idx].class = val;
                    setEntries([...entries]);
                  }}
                  shouldItemRender={(item, value) =>
                    item.toLowerCase().startsWith(value.toLowerCase()) ||
                    item
                      .toLowerCase()
                      .replace("-", " ")
                      .startsWith(value.toLowerCase()) ||
                    item
                      .toLowerCase()
                      .replace("-", "")
                      .startsWith(value.toLowerCase()) ||
                    item.endsWith(value)
                  }
                  renderMenu={renderMenu}
                  inputProps={{
                    placeholder: "Class",
                  }}
                />
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
                placeholder="Class comments..."
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
