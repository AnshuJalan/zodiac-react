import React from "react";
import { useLocation } from "react-router-dom";

const MainContainer = (props) => {
  return (
    <div
      style={
        useLocation().pathname === "/" ? { height: "0%" } : { height: "100%" }
      }
      className="main-container"
    >
      {props.children}
    </div>
  );
};

export default MainContainer;
