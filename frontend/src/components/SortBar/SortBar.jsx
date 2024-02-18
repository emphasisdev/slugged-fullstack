import React, { useState } from "react";

const styles = {
  sortBar: {
    width: "87.5vw",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    paddingLeft: "15px",
    marginBottom: "5px",
    alignContent: "center",
    marginTop: "32px",
    marginBottom: "16px",
    backgroundColor: "white",
    marginLeft: "1rem",
    marginRight: "1rem",
    border: "1px solid grey",
    paddingBottom: "5px",
    borderBottom: "10px solid #C4D9DE",
  },
  selectBar: {
    borderRadius: "30px",
    backgroundColor: "#6EDEFA",
    height: "2rem",
    marginTop: "1rem",
    padding: "7px",
  },
  button: {
    borderRadius: "15px",

    height: "2.5rem",
    marginTop: "1rem",
    padding: "7px",
    width: "6rem",
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    alignItems: "center",
    fontSize: "1rem",
    marginRight: "5px",
    border: "none",
  },
};

function SortBar({ setSelectedSort }) {
  const [selectedSortLabel, setSelectedSortLabel] = useState("Best");
  // const handleSort = (e) => {
  //   const sortObj = possibleSorts.find((x) => x.label === e.target.value);

  //   setSelectedSort(sortObj.value);
  //   setSelectedSortLabel(sortObj.label);
  // };

  const possibleSorts = [
    {
      label: "Best",
      value: { sort_by: "votes", order: "desc" },
      icon: "whatshot",
    },

    {
      label: "Hot",
      value: { sort_by: "comment_count", order: "desc" },
      icon: "sms_failed",
    },
    {
      label: "New",
      value: { sort_by: "date", order: "desc" },
      icon: "update",
    },
  ];

  const handleSort = (value, label) => {
    return (e) => {
      e.preventDefault();
      setSelectedSortLabel(label);
      setSelectedSort(value);
    };
  };
  return (
    <form style={styles.sortBar}>
      {possibleSorts.map(({ label, value, icon }) => {
        return (
          <button
            key={`sort-${label}`}
            style={{
              ...styles.button,
              backgroundColor:
                label === selectedSortLabel ? "#6EDEFA" : "#F2F2F1",
            }}
            type="default"
            onClick={handleSort(value, label)}
          >
            <span className="material-symbols-outlined">{icon}</span>
            {label}
          </button>
        );
      })}
    </form>
  );
}

export default SortBar;
