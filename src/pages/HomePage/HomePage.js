import React from "react";
import { useState } from "react";
import "./HomePage.scss";
import NavBar from "./../../components/NavBar/NavBar";
import { useHistory } from "react-router-dom";
import Autocomplete from "react-autocomplete";
import { allClasses } from "./../../utils/ClassUtils";

function HomePage() {
  const history = useHistory();
  const [value, setValue] = useState("");
  const handleAddReviewsClick = () => {
    history.push("/add");
  };
  function renderMenu(items, value, style) {
    return value === "" ? (
      <div></div>
    ) : (
      <div
        style={{ ...style, ...this.menuStyle, maxHeight: "300px" }}
        children={items}
      />
    );
  }
  return (
    <div>
      <NavBar />
      <div className="mainContainer">
        <h2 className="mainTitle">ReviewU</h2>
        <Autocomplete
          className="searchbar"
          getItemValue={(item) => item}
          items={allClasses}
          renderItem={(item, isHighlighted) => (
            <div
              style={{
                background: isHighlighted ? "lightgray" : "white",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              {item}
            </div>
          )}
          selectOnBlur={true}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSelect={(val) => {
            history.push("/class/" + val);
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
            className: "searchbar",
            placeholder: "Enter a class...",
          }}
        />
        <h2 className="add-reviews" onClick={handleAddReviewsClick}>
          Add Reviews
        </h2>
      </div>
    </div>
  );
}

export default HomePage;
