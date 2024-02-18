import React, { useState } from "react";
import { postComment } from "../../api";

const styles = {
  postSection: {
    margin: "10px",
    borderTop: "1px solid grey",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  usernameText: {
    textAlign: "left",
    paddingLeft: "0.5rem",
    margin: "0.5rem",
  },
  textInput: {
    height: "4rem",
    width: "95%",
    margin: "auto",
    borderRadius: "5px",
  },
  submitButton: {
    height: "2rem",
    width: "30%",
    alignSelf: "flex-end",
    borderRadius: "25px",
    fontSize: "1rem",
    margin: "5px",
    backgroundColor: "#3766DB",
    color: "white",
    border: "none",
    fontWeight: "bold",
  },
};

function CommentPost({ article_id, setComments }) {
  const username = "jessjelly";
  const [body, setBody] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [commentPosted, setCommentPosted] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setWaitingForResponse(true);
    postComment(article_id, username, body)
      .then((newComment) => {
        setComments((currComments) => {
          return [newComment, ...currComments];
        });
        setCommentError(false);
        setCommentPosted(true);
        setWaitingForResponse(false);
      })
      .catch(() => {
        setWaitingForResponse(false);
        setCommentError(true);
        setCommentPosted(false);
      });
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  return (
    <section style={styles.postSection}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label
          htmlFor="comment input"
          style={styles.usernameText}
        >{`Comment as ${username}`}</label>
        <input
          required={true}
          placeholder={"What's on your mind?"}
          type="text"
          value={body}
          onChange={handleBodyChange}
          name="comment input"
          style={styles.textInput}
        ></input>
        <button
          type="submit"
          disabled={waitingForResponse}
          style={styles.submitButton}
        >
          Comment
        </button>
        {commentPosted && <p>Comment Posted!</p>}
        {commentError && <p>Oops, sorry something went wrong there!</p>}
      </form>
    </section>
  );
}

export default CommentPost;
