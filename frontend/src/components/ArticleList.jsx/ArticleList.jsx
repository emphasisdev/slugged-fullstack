import React from "react";

import ArticleCard from "../ArticleCard/ArticleCard";
import SortBar from "../SortBar/SortBar";

const style = {
  articleList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "left",
    justifyContent: "left",
    marginBlockStart: "0px",
    padding: "0px",
    width: "100%",
  },
  articleCard: {
    display: "flex",
    flexDirection: "column",
    height: "4rem",
    width: "90vw",
    borderBottom: "1px solid grey",
    textAlign: "left",
    marginLeft: "1rem",
    marginRight: "1rem",
    fontSize: "0.7rem",
  },
  articleTitle: {
    marginBottom: "0px",
  },
  articleSection: {
    display: "flex",
    flexDirection: "column",
  },
};

function ArticleList({ articles, setSelectedSort }) {
  return (
    <section style={style.articleSection}>
      <ul style={style.articleList}>
        <SortBar setSelectedSort={setSelectedSort} style={{ width: "100%" }} />
        {articles.map((article) => {
          return (
            <ArticleCard
              article={article}
              key={`article${article.article_id}`}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ArticleList;
