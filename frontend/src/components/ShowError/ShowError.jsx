import React from "react";
import { Link } from "react-router-dom";

function ShowError() {
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <>
      <p>Sorry, there doesn't seem to be anything here.</p>
      <Link to="/">
        <button>Go Home</button>
      </Link>
      <button onClick={refreshPage}>Try Again?</button>
    </>
  );
}

export default ShowError;
