import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../../api";
import infoContext from "../../contexts/InfoContext";
import ArticleList from "../ArticleList.jsx/ArticleList";
import Loading from "../Loading/Loading";
import ShowError from "../ShowError/ShowError";

function Slugged({ topics }) {
  const [articles, setArticles] = useState([]);
  const { slug } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedSort, setSelectedSort] = useState({
    sort_by: "date",
    order: "desc",
  });

  const { setInfo } = useContext(infoContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    const { sort_by, order } = selectedSort;

    const validTopics = topics.map((x) => x.slug);

    if (validTopics.includes(slug)) {
      fetchArticles(slug, sort_by, order)
        .then((fetchedArticles) => {
          setArticles(fetchedArticles);
          setIsLoading(false);
        })
        .catch(() => {
          setError(true);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setError(true);
    }
  }, [slug, selectedSort]);

  useEffect(() => {
    if (slug) {
      setInfo(() => {
        let slugObj;
        topics.forEach((topic) => {
          if (topic.slug === slug) {
            slugObj = topic;
          }
        });
        return slugObj;
      });
    }
  }, [slug, topics]);

  if (isLoading) return <Loading />;
  if (error) return <ShowError />;

  return <ArticleList articles={articles} setSelectedSort={setSelectedSort} />;
}

export default Slugged;
