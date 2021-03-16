import React from "react";
import { useState } from "react";
import "./SearchBar.scss";
import Autocomplete from "react-autocomplete";
import { allClasses } from "./../../utils/ClassUtils";
import { useHistory } from "react-router-dom";

function SearchBar(props) {
  const [value, setValue] = useState("");
  const history = useHistory();

  function renderMenu(items, value, style) {
    return value === "" ? (
      <div></div>
    ) : (
      <div
        style={{ ...style, ...this.menuStyle, maxHeight: "300px", zIndex: 2 }}
        children={items}
      />
    );
  }

  return (
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
        item.toLowerCase().replace("-", " ").startsWith(value.toLowerCase()) ||
        item.toLowerCase().replace("-", "").startsWith(value.toLowerCase()) ||
        item.endsWith(value)
      }
      renderMenu={renderMenu}
      inputProps={{
        className: "searchbar",
        placeholder: "Enter a class...",
      }}
    />
  );
}

export default SearchBar;
