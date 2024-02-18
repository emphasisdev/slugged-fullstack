import React, { useContext, useEffect } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import { Link } from "react-router-dom";
import InfoContext from "../../contexts/InfoContext";
const styles = {
  username: {
    marginLeft: "10px",
    marginRight: "5px",
    marginTop: "7px",
    borderRadius: "5px",
    gridArea: "1/3/3/4",

    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gridTemplateRows: "1fr",
    textDecoration: "none",
    color: "black",
  },
  centeredUsername: {
    textDecoration: "none",
    color: "black",
    marginTop: "7px",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "5px",
    gridArea: "1/3/3/4",

    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr",
  },

  avatar: {
    height: "3rem",
    width: "3rem",
    gridArea: "1/2/2/3",
    border: "2px solid #3766DB",
    borderRadius: "50%",
  },
  name: {
    gridArea: "1/1/2/2",
    fontSize: "1.5rem",
    marginTop: "auto",
    marginBottom: "auto",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
};

function ProfileHeader() {
  const { setInfo } = useContext(InfoContext);
  const username = "jessjelly";
  const imgURL =
    "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141";

  const { isMobile } = useScreenSize();

  useEffect(() => {
    setInfo({});
  }, []);
  return (
    <Link
      to={`/u/${username}`}
      style={isMobile ? styles.centeredUsername : styles.username}
    >
      {!isMobile && <p style={styles.name}>u/{username}</p>}
      <img src={imgURL} style={styles.avatar}></img>
    </Link>
  );
}

export default ProfileHeader;
