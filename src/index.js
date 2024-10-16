import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./component/Ui/StartRating";

function Test() {
  const [movieRating, setMovieRating] = useState("");

  return (
    <div>
      <StarRating color="red" onSetRating={setMovieRating}></StarRating>
      <p>{movieRating}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
