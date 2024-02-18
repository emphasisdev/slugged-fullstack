import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const styles = {
  topicContainer: {
    borderLeft: "1px solid grey",
    borderRight: "1px solid grey",
    width: "100%",
    height: "80%",
    textAlign: "left",
    fontSize: "1.3rem",
    maxWidth: "400px",
    marginBottom: "5px",
    gridArea: "1/2/3/3",
    display: "flex",
    flexDirection: "column",
  },
  firstMenuItem: {
    display: "grid",
    gridTemplateColumns: "85% 15%",
    alignItems: "center",
    marginRight: "5px",
    marginLeft: "10px",
    paddingRight: "10px",
  },
  openedMenu: {
    display: "grid",
    width: "100%",
    backgroundColor: "#F2F2F1",
    border: "1px solid grey",
    opacity: "100%",
    position: "relative",
  },
  menuOption: {
    borderBottom: "1px solid grey",
    textDecoration: "none",
    display: "grid",
    gridTemplateColumns: "90% 10%",
    alignItems: "center",
    marginLeft: "5px",
    marginRight: "5px",
  },
  menuText: {
    color: "black",
    marginLeft: "10px",
  },
};

function TopicDropdown({ topics, info }) {
  const toggleMenu = () => {
    setNavMenuOpen(!navMenuOpen);
  };

  const [navMenuOpen, setNavMenuOpen] = useState(false);
  return (
    <section style={styles.topicContainer}>
      <div onClick={toggleMenu} style={styles.firstMenuItem}>
        <p>{info.slug ? info.slug : "Home"} </p>
        <span aria-label="topic menu" className="material-symbols-outlined">
          menu
        </span>
      </div>
      {navMenuOpen && (
        <div style={styles.openedMenu}>
          {info.slug ? (
            <NavLink to={`/`} style={styles.menuOption} onClick={toggleMenu}>
              <p key={`home`} style={styles.menuText}>
                Home
              </p>
              <p>{">"}</p>
            </NavLink>
          ) : null}
          {topics
            .filter((x) => x.slug !== info.slug)
            .map((topic) => {
              return (
                <NavLink
                  to={`/s/${topic.slug}`}
                  key={`topic-${topic.slug}`}
                  style={styles.menuOption}
                  onClick={toggleMenu}
                >
                  <p style={styles.menuText}>/{topic.slug}</p>
                  <p>{">"}</p>
                </NavLink>
              );
            })}
        </div>
      )}
    </section>
  );
}

export default TopicDropdown;
