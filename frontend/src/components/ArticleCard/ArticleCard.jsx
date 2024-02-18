import React from "react";
import { Link } from "react-router-dom";
// import ArticleVote from "../ArticleVote/ArticleVote";
import ArticleVoteVert from "../ArticleVoteVert/ArticleVoteVert";
import moment from "moment";

const styles = {
  articleCard: {
    display: "grid",
    gridTemplateColumns: "0.5fr 6fr",
    gridTemplateRows: "0.5fr 1fr 0.5fr",
    gridColumnGap: "0px",
    gridRowGap: "0px",

    minHeight: "5rem",
    maxHeight: "13rem",
    width: "90vw",
    border: "1px solid grey",
    textAlign: "left",
    marginLeft: "1rem",
    marginRight: "1rem",
    fontSize: "0.7rem",

    backgroundColor: "white",
    marginBottom: "5px",
  },
  articleTitle: {
    fontSize: "1.3rem",
  },
  slugText: {
    fontSize: "1rem",
  },
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    height: "2rem",
    gridArea: "3 / 2 / 4 / 3",
  },
  commentIcon: {
    marginLeft: "10px",
    marginRight: "10px",
    paddingTop: "5px",
  },
  commentText: {
    alignContent: "center",
    marginBlockEnd: "0px",
  },
  commentCount: {
    display: "flex",
    flexDirection: "row",
    textDecoration: "none",
    color: "black",
  },
  voteSection: {
    gridArea: "1 / 1 / 4/ 2",
    margin: "auto",
    backgroundColor: "#C4D9DE",
    height: "100%",
    width: "100%",

    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr 2fr",
    gridColumnGap: "0px",
    gridRowGap: "0px",
  },
  topBar: {
    gridArea: "1 / 2 / 2 / 3",

    display: "grid",
    gridTemplateColumns: "1fr 5fr 0.5fr",
    alignItems: "center",
    marginLeft: "1rem",
  },
  titleSection: {
    gridArea: "2 / 2 / 3 / 3",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
};

function ArticleCard({ article }) {
  return (
    <li style={styles.articleCard} key={"article" + article.article_id}>
      <section style={styles.voteSection}>
        <ArticleVoteVert
          article_id={article.article_id}
          articleVotes={article.votes}
          style={styles.votes}
        />
      </section>
      <section style={styles.topBar}>
        <Link
          to={`/s/${article.topic}`}
          style={{ linkDecoration: "none", color: "black" }}
        >
          <p style={styles.slugText}>{"/" + article.topic}</p>
        </Link>

        <p style={{ marginLeft: "5px" }}>
          Posted by {article.author} {moment(article.created_at).fromNow()}
        </p>
      </section>

      <section style={styles.titleSection}>
        <Link
          to={`/article/${article.article_id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <p style={styles.articleTitle}> {article.title}</p>
        </Link>
      </section>
      <section style={styles.bottomBar}>
        <Link to={`/article/${article.article_id}`} style={styles.commentCount}>
          <span
            className="material-symbols-outlined"
            style={styles.commentIcon}
          >
            chat_bubble
          </span>
          <p style={styles.commentText}>{article.comment_count} Comments</p>
        </Link>
      </section>
    </li>
  );
}

export default ArticleCard;
