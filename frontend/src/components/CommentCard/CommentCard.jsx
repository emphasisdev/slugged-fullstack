import React, { useState } from "react";
import CommentVote from "../CommentVote/CommentVote";
import { deleteComment } from "../../api";
import moment from "moment";

const styles = {
  commentCard: {
    // border: "1px solid black",
    borderLeft: "1px solid grey",
    display: "grid",
    gridTemplateColumns: "0.2fr 2fr",
    gridTemplateRows: "0.5fr 1fr 0.5fr",
    gridColumnGap: "0px",
    gridRowGap: "0px",
    marginRight: "20px",
    marginLeft: "10px",
  },
  userIcon: {
    gridArea: "1/1/2/1",
    fontSize: "3rem",
    marginTop: "0.5rem",
  },
  postInfo: {
    gridArea: "1/2/2/3",
    textAlign: "left",
    marginBottom: "5px",
    width: "95%",
    borderBottom: "1px solid grey",
  },
  postBody: {
    textAlign: "left",
    gridArea: "2/2/3/3",
  },
  bottomBar: {
    gridArea: "3/2/4/3",
    display: "grid",
    gridTemplateColumns: "0.3fr 0.5fr 1fr",
    gridTemplateRows: "1fr",
    gridColumnGap: "0px",
    gridRowGap: "0px",
    marginBottom: "1rem",
  },
  delete: {
    backgroundColor: "Transparent",
    border: "none",
    textAlign: "left",
    marginLeft: "1rem",
    fontSize: "1.1rem",
    color: "#605959",
  },
};

function CommentCard({ comment }) {
  const { comment_id, body, author, votes } = comment;

  const [isDeleting, setIsDeleting] = useState(false);

  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);

    deleteComment(comment_id)
      .then((res) => {
        if (res.status === 204) {
          setIsDeleting(false);
          setDeleted(true);
        }
      })
      .catch(() => {
        setIsDeleting(true);
      });
  };
  return (
    <section
      style={{
        ...styles.commentCard,
        backgroundColor: isDeleting ? "light grey" : null,
      }}
    >
      {deleted ? (
        <p style={styles.postBody}>Comment deleted by user · just now</p>
      ) : (
        <>
          <span className="material-symbols-outlined" style={styles.userIcon}>
            account_circle
          </span>
          <p style={styles.postInfo}>
            <strong>{author}</strong> - {moment(comment.created_at).fromNow()}
          </p>
          <p style={styles.postBody}>{body}</p>
          <section style={styles.bottomBar}>
            <CommentVote comment_id={comment_id} comment_votes={votes} />
            <button
              style={styles.delete}
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <strong>Delete</strong>
            </button>
          </section>
        </>
      )}
    </section>
  );
}

export default CommentCard;
