import React from "react";
import { Link } from "react-router-dom";
import desktopSluggedIcon from "../../assets/Slugged.png";
import mobileSluggedIcon from "../../assets/Slugged-icon-only.png";
import { useContext } from "react";
import InfoContext from "../../contexts/InfoContext";
import TopicDropdown from "../TopicDropdown/TopicDropdown";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import useScreenSize from "../../hooks/useScreenSize";

const styles = {
  headerContainer: {
    width: "100%",
    height: "4rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "1fr",
    gridColumnGap: "0px",
    gridRowGap: "0px",
    marginBottom: "10px",
    position: "fixed",
    opacity: "100%",
    backgroundColor: "#F2F2F1",
    top: "0",
    borderBottom: "1px solid grey",
    paddingTop: "5px",
  },
  desktopSluggedIcon: {
    height: "4rem",
    width: "12rem",
    objectFit: "cover",
    gridArea: "1/1/2/2",
  },
  mobileSluggedIcon: {
    height: "4rem",
    width: "4rem",
    objectFit: "fit",
    gridArea: "1/1/2/2",
  },
  username: {
    marginLeft: "10px",
    marginRight: "5px",
    borderRadius: "5px",
    gridArea: "1/3/3/4",
  },
};

export default function Header({ topics }) {
  const { info } = useContext(InfoContext);
  const { isMobile } = useScreenSize();

  return (
    <header style={styles.headerContainer}>
      <Link to="/">
        <img
          style={
            isMobile ? styles.mobileSluggedIcon : styles.desktopSluggedIcon
          }
          src={isMobile ? mobileSluggedIcon : desktopSluggedIcon}
        ></img>
      </Link>
      <TopicDropdown topics={topics} info={info} />

      <ProfileHeader />
    </header>
  );
}
