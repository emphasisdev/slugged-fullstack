import React, { useEffect, useState, useContext } from "react";
import { fetchArticles } from "../../api";
import ArticleList from "../ArticleList.jsx/ArticleList";
import infoContext from "../../contexts/InfoContext";
import Loading from "../Loading/Loading";

function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { setInfo } = useContext(infoContext);

  const [selectedSort, setSelectedSort] = useState({
    sort_by: "date",
    order: "desc",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const { sort_by, order } = selectedSort;
    setInfo({});
    fetchArticles(null, sort_by, order)
      .then((fetchedArticles) => {
        setArticles(fetchedArticles.slice(0, 10));
        setIsLoading(false);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [selectedSort]);

  if (isLoading) return <Loading />;
  if (error) return <p>Somethings gone wrong there sorry</p>;

  return (
    <div>
      <ArticleList articles={articles} setSelectedSort={setSelectedSort} />
    </div>
  );
}

export default Home;
