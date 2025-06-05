import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Simply navigates to Ranges on useEffect
const Navigate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Navigated");
    navigate("/ranges");
  });

  return (
    <div>
      <h1>Redirecting...</h1>
      <p>Redirecting to Ranges</p>
      <p>
        If you are not redirected, click <a href="/ranges">here</a>
      </p>
    </div>
  );
};

export default Navigate;
