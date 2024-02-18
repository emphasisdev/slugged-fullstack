import React, { useEffect, useState } from "react";

import { fetchUserPosts } from "../../api";
import ArticleList from "../ArticleList.jsx/ArticleList";

const styles = {
  title: {
    textAlign: "left",
    marginLeft: "20px",
  },
};

export default function ProfilePage() {
  const username = "jessjelly";
  const [userPosts, setUserPosts] = useState([]);

  const [selectedSort, setSelectedSort] = useState({
    sort_by: "date",
    order: "desc",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUserPosts("jessjelly", selectedSort).then((posts) => {
      setUserPosts(posts);
    });
  }, [selectedSort]);
  return (
    <section>
      <h2 style={styles.title}>u/{username}'s Posts</h2>
      <ArticleList articles={userPosts} setSelectedSort={setSelectedSort} />
    </section>
  );
}
