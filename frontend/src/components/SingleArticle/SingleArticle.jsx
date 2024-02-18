import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleWithId } from "../../api";
import moment from "moment";
import ArticleVoteVert from "../ArticleVoteVert/ArticleVoteVert";
import CommentsList from "../CommentsList/CommentsList";
import InfoContext from "../../contexts/InfoContext";
import ShowError from "../ShowError/ShowError";
import Loading from "../Loading/Loading";

const styles = {
  articlePage: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  articleSection: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "0.5fr 6fr",
    gridTemplateRows: "0.5fr 0.5fr",
    gridColumnGap: "0px",
    gridRowGap: "0px",
  },
  topSection: {
    maxHeight: "8rem",
    gridArea: "1 / 2 / 2 / 4",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "0.5fr 1fr",
  },
  votes: {
    gridArea: "1 / 1 / 2 / 2",
    marginBottom: "10px",
    marginTop: "10px",
    paddingBottom: "80%",
    display: "flex",
    flexDirection: "column",
  },
  posterInfo: {
    textAlign: "left",
    marginLeft: "5px",
    gridArea: "1/1/2/2",
  },
  title: { gridArea: "2/1/3/2", textAlign: "left", marginLeft: "5px" },
  body: {
    display: "flex",
    flexDirection: "row",
    gridArea: "2 / 2 / 3 /2",
    alignItems: "start",
    textAlign: "left",
    marginLeft: "20px",
    height: "100%",
    marginRight: "30px",
  },
  commentCount: {
    gridArea: "1/1/2/2",
    textAlign: "left",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "10px",
    color: "#605959",
    marginLeft: "15px",
    borderRight: "1px solid grey",
  },
  commentText: {
    marginLeft: "10px",
  },
  share: {
    gridArea: "1/2/2/2",
    margin: "auto",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "#605959",
  },
  bottomBar: {
    gridArea: "3/2/4/4",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr",
    alignItems: "center",
  },
};
function SingleArticle() {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { article_id } = useParams();

  const [copied, setCopied] = useState(false);
  const { setInfo } = useContext(InfoContext);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchArticleWithId(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
        setInfo({ slug: fetchedArticle.topic });
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
        setInfo({});
      });
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <ShowError />;
  return (
    <section style={styles.articlePage}>
      <section style={styles.articleSection}>
        <section style={styles.votes}>
          <ArticleVoteVert
            article_id={article.article_id}
            articleVotes={article.votes}
            style={styles.votes}
          />
        </section>
        <section style={styles.topSection}>
          <p style={styles.posterInfo}>
            Posted by {article.author} {moment(article.created_at).fromNow()}
          </p>
          <h2 style={styles.title}>{article.title}</h2>
        </section>
        <p style={styles.body}>{article.body}</p>
        <section style={styles.bottomBar}>
          <section style={styles.commentCount}>
            <span className="material-symbols-outlined">chat_bubble</span>
            <strong style={styles.commentText}>
              {article.comment_count} Comments
            </strong>
          </section>
          <section style={styles.share} onClick={copyToClipboard}>
            <span className="material-symbols-outlined">share</span>{" "}
            <strong style={styles.shareText}>
              {copied ? "Copied!" : "Share"}
            </strong>
          </section>
        </section>
      </section>
      <CommentsList article_id={article.article_id} />
    </section>
  );
}

export default SingleArticle;
