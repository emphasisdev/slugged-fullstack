import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Slugged from "./components/Slugged/Slugged";
import { useEffect, useState } from "react";
import { fetchTopics } from "./api";
import SingleArticle from "./components/SingleArticle/SingleArticle";
import InfoContext from "./contexts/InfoContext";
import ShowError from "./components/ShowError/ShowError";
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";
import useScreenSize from "./hooks/useScreenSize";

import Sidebar from "./components/Sidebar/Sidebar";
import ProfilePage from "./components/ProfilePage/ProfilePage";

const styles = {
  app: {
    backgroundColor: "#F2F2F1",
    margin: "-5px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "10vh 1fr",
    gridColumnGap: "0px",
    gridRowGap: "0px",
    maxWidth: "100vw",
    minHeight: "100vh",
    paddingRight: "5px",
  },
  mobileView: {
    gridArea: "2/1/3/4",
    maxWidth: "100vw",
    backgroundColor: "#F2F2F1",
    margin: "-5px",
  },
  desktopView: {
    gridArea: "2/1/3/4",
    maxWidth: "100vw",
    backgroundColor: "#F2F2F1",
    margin: "-5px",
    display: "grid",
    gridTemplateColumns: "70% 30%",
  },
  header: {
    gridArea: "1/1/2/4",
    marginBottom: "5px",
    marginTop: "5px",
  },
};

function App() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState({});

  const { isMobile } = useScreenSize();

  useEffect(() => {
    fetchTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
      })
      .then(() => {
        setIsLoading(false);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );

  if (error) return <p>Oops, somethings gone wrong there!!</p>;
  return (
    <InfoContext.Provider value={{ info, setInfo }}>
      <div className="App" style={styles.app}>
        <header style={styles.header}>
          <Header topics={topics} />
        </header>

        <main style={isMobile ? styles.mobileView : styles.desktopView}>
          <section style={styles.content}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/s/:slug" element={<Slugged topics={topics} />} />
              <Route path="/article/:article_id" element={<SingleArticle />} />
              <Route path="/u/:username" element={<ProfilePage />} />
              <Route path="/*" element={<ShowError />} />
            </Routes>
          </section>

          {isMobile ? null : (
            <Sidebar info={info} topics={topics} setInfo={setInfo} />
          )}
        </main>
      </div>
    </InfoContext.Provider>
  );
}

export default App;
