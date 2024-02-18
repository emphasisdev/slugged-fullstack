import React, { useEffect, useState } from "react";
import upvoteEmpty from "../../assets/upvote-empty.png";
import upvoteFull from "../../assets/upvote-full.png";
import downvoteEmpty from "../../assets/downvote-empty.png";
import downvoteFull from "../../assets/downvote-full.png";
// import { style } from "./ArticleVote.style.js";
import { patchArticleVotes } from "../../api";

const styles = {
  voteBar: {
    height: "2rem",
    width: "30%",
    display: "flex",
    flexDirection: "row",
    fontSize: "1.2rem",
    justifyContent: "space-around",
  },
  upvote: {
    height: "1.3rem",
    // width: "1.3rem",
    backgroundColor: "Transparent",
    border: "none",
    margin: "auto",
    marginLeft: "2px",
    marginRight: "2px",
  },

  downvote: {
    height: "1.3rem",
    // width: "1.3rem",
    backgroundColor: "Transparent",
    border: "none",
    margin: "auto",
    marginLeft: "2px",
    marginRight: "2px",
  },
  voteText: {
    height: "100%",
    // width: "2rem",
    justifyContent: "center",
    alignContent: "center",
    marginTop: "5px",
    // marginBlockStart: "0px",
    marginBlockEnd: "0px",
    textAlign: "center",
    marginLeft: "2px",
    marginRight: "2px",
  },
};

export default function ArticleVote({ article_id, articleVotes }) {
  const [votes] = useState(articleVotes);
  const [voteChange, setVoteChange] = useState(0);

  function handleVote(incVote) {
    const oppositeVoteValue = incVote > 0 ? -1 : 1;
    const changeVote = () => {
      // This allow the user to only either add or remove a single vote in either direction
      if (voteChange !== incVote) {
        setVoteChange(incVote);
        patchArticleVotes(article_id, incVote).catch(() => {
          setVoteChange(0);
        });
      } else {
        setVoteChange(0);
        patchArticleVotes(article_id, oppositeVoteValue).catch(() => {
          setVoteChange(0);
        });
      }
    };

    return changeVote;
  }

  return (
    <div style={styles.voteBar}>
      <button style={styles.upvote} onClick={handleVote(1)}>
        <img
          src={voteChange > 0 ? upvoteFull : upvoteEmpty}
          style={styles.upvote}
          alt="up vote"
        />
      </button>
      <p style={styles.voteText}>{votes + voteChange}</p>
      <button style={styles.downvote} onClick={handleVote(-1)}>
        <img
          src={voteChange < 0 ? downvoteFull : downvoteEmpty}
          style={styles.downvote}
          alt="down vote"
        />
      </button>
    </div>
  );
}
