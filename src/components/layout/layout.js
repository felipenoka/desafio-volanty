import React from "react";
import loading from "./assets/loading.gif";

import "./layout.css";

export default () => {
  return (
    <div className="loading-div">
      <img src={loading} alt="loading..." className="loading" />
    </div>
  );
};
