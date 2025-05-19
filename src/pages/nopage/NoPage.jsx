import React, { useEffect } from "react";

const NoPage = () => {

  useEffect(() => {
    console.log("NoPage page update");
  });

  /*NoPage shows up when the browser tries to navigate somewhere that doesn't exist.
  Hopefully this doesn't happen too often */

  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <p>Something went wrong</p>
    </div>
  );
};

export default NoPage;
