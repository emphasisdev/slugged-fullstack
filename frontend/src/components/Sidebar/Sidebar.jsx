import React, { useEffect } from "react";
import fakeAd from "../../assets/fake-ad.png";

const styles = {
  sideBar: {
    marginTop: "3rem",
    width: "100%",
    maxHeight: "80vw",
    borderLeft: "1px solid grey",
    paddingLeft: "5px",
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    marginRight: "30px",
    gridArea: "1/2/2/3",
  },
  infoSection: {
    borderBottom: "1px solid grey",
    height: "100%",
    width: "100%",
    justifyItems: "center",
    alignItems: "center",
    marginTop: "25%",
    gridArea: "1/1/2/1",
  },
  fakeAd: {
    gridArea: "2/1/3/1",
    marginTop: "-40%",
    paddingTop: "5px",
    paddingRight: "10px",
    borderTop: "1px solid grey",
  },
  fakeAdImage: {
    height: "auto",
    width: "100%",
  },
};

function Sidebar({ info, topics, setInfo }) {
  useEffect(() => {
    if (info.slug) {
      setInfo((currentInfo) => {
        const info = topics.find((x) => x.slug === currentInfo.slug);
        return info;
      });
    }
  }, [info]);
  return (
    <section style={styles.sideBar}>
      <section style={styles.infoSection}>
        {info.slug ? (
          <>
            <h2>{info.slug[0].toUpperCase() + info.slug.slice(1)}</h2>
            <p>{info.description}</p>
          </>
        ) : (
          <>
            <h2>Slugged</h2>
            <p>Home Of The News</p>
          </>
        )}
      </section>
      <section style={styles.fakeAd}>
        <img
          style={styles.fakeAdImage}
          src={fakeAd}
          alt="fake ad that links to Emily Bennett's portfolio"
        ></img>
      </section>
    </section>
  );
}

export default Sidebar;
