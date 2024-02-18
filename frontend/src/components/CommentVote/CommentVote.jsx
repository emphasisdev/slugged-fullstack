import React, { useState } from "react";
import { patchCommentVotes } from "../../api";
import upvoteEmpty from "../../assets/upvote-empty.png";
import upvoteFull from "../../assets/upvote-full.png";
import downvoteEmpty from "../../assets/downvote-empty.png";
import downvoteFull from "../../assets/downvote-full.png";

const styles = {
  upvote: {
    height: "1.5rem",
    width: "1.5rem",
    margin: "auto",
  },

  downvote: {
    height: "1.5rem",
    width: "1.5rem",
    margin: "auto",
  },
  upvoteButton: {
    height: "2.2rem",
    width: "2.2rem",
    backgroundColor: "Transparent",
    border: "none",

    alignSelf: "center",
    margin: "auto",
  },

  downvoteButton: {
    height: "2.2rem",
    width: "2.2rem",
    backgroundColor: "Transparent",
    border: "none",
    alignSelf: "center",
    margin: "auto",
  },

  voteCount: {
    fontSize: "1.2rem",
    height: "2rem",
    width: "2rem",
    backgroundColor: "Transparent",
    border: "none",
    textAlign: "center",
    margin: "auto",
    marginTop: "25%",
    alignSelf: "center",
  },
  votingSection: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "1fr",
    gridColumnGap: "0px",
    gridRowGap: "0px",
    justifyItems: "center",
  },
};
function CommentVote({ comment_id, comment_votes }) {
  const [votes] = useState(comment_votes);
  const [voteChange, setVoteChange] = useState(0);

  function handleVote(incVote) {
    const oppositeVoteValue = incVote > 0 ? -1 : 1;
    const changeVote = () => {
      // This allow the user to only either add or remove a single vote in either direction
      if (voteChange !== incVote) {
        setVoteChange(incVote);
        patchCommentVotes(comment_id, incVote).catch(() => {
          setVoteChange(0);
        });
      } else {
        setVoteChange(0);
        patchCommentVotes(comment_id, oppositeVoteValue).catch(() => {
          setVoteChange(0);
        });
      }
    };

    return changeVote;
  }

  return (
    <section style={styles.votingSection}>
      <button style={styles.upvoteButton} onClick={handleVote(1)}>
        <img
          src={voteChange > 0 ? upvoteFull : upvoteEmpty}
          style={styles.upvote}
          alt="up vote"
        />
      </button>
      <strong style={styles.voteCount}>{votes + voteChange}</strong>
      <button style={styles.downvoteButton} onClick={handleVote(-1)}>
        <img
          src={voteChange < 0 ? downvoteFull : downvoteEmpty}
          style={styles.downvote}
          alt="down vote"
        />
      </button>
    </section>
  );
}

export default CommentVote;
