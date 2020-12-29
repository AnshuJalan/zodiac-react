import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Sidebar.css";

const types = {
  CREATE: "/markets/new",
  MARKETS: "/markets/open",
  MARKET: "/market/show",
  ADMIN: "/markets/account",
  WALLET: "/wallet",
};

const SideBar = () => {
  const [selected, changeSelected] = useState();

  const url = useLocation().pathname;
  if (url !== selected) {
    changeSelected(url);
  }

  if (url === "/") {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <div className="sidebar">
      <img
        width="96"
        alt="brand"
        src={process.env.PUBLIC_URL + "/images/brand.svg"}
      />
      <div className="sidebar-icons">
        <Link to="/markets/new">
          <div
            onClick={() => changeSelected(types.CREATE)}
            className={`icon-wrapper ${
              selected === types.CREATE ? "selected" : ""
            }`}
          >
            <span className="material-icons">add_box</span>
          </div>
        </Link>

        <Link to="/markets/open">
          <div
            onClick={() => changeSelected(types.MARKETS)}
            className={`icon-wrapper ${
              selected === types.MARKETS || selected === types.MARKET
                ? "selected"
                : ""
            }`}
          >
            <span className="material-icons">store</span>
          </div>
        </Link>

        <Link to="/markets/account">
          <div
            onClick={() => changeSelected(types.ADMIN)}
            className={`icon-wrapper ${
              selected === types.ADMIN ? "selected" : ""
            }`}
          >
            <span className="material-icons">admin_panel_settings</span>
          </div>
        </Link>

        <Link to="/wallet">
          <div
            onClick={() => changeSelected(types.WALLET)}
            className={`icon-wrapper ${
              selected === types.WALLET ? "selected" : ""
            }`}
          >
            <span className="material-icons">account_balance_wallet</span>
          </div>
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default SideBar;
