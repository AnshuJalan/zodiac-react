import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  function getHeading() {
    if (location.pathname === "/wallet") return "WALLET SETTINGS";
    else if (location.pathname === "/markets/open") return "OPEN MARKETS";
    else if (location.pathname === "/market/show") return "OPEN MARKETS";
    else if (location.pathname === "/markets/new") return "CREATE NEW MARKET";
    else if (location.pathname === "/markets/account") return "YOUR MARKETS";
    else return "";
  }

  return <div style={headerStyle}>{getHeading()}</div>;
};

const headerStyle = {
  position: "absolute",
  left: "156px",
  top: "18px",
  fontWeight: "600",
  fontSize: "20px",
};

export default Header;
