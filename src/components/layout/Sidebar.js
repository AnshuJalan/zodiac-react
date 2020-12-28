import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";

const SideBar = () => {
  const [selected, changeSelected] = useState("store");

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
            onClick={() => changeSelected("add_box")}
            className={`icon-wrapper ${
              selected === "add_box" ? "selected" : ""
            }`}
          >
            <span className="material-icons">add_box</span>
          </div>
        </Link>

        <Link to="/markets/open">
          <div
            onClick={() => changeSelected("store")}
            className={`icon-wrapper ${selected === "store" ? "selected" : ""}`}
          >
            <span className="material-icons">store</span>
          </div>
        </Link>

        <Link to="/account/markets">
          <div
            onClick={() => changeSelected("admin")}
            className={`icon-wrapper ${selected === "admin" ? "selected" : ""}`}
          >
            <span className="material-icons">admin_panel_settings</span>
          </div>
        </Link>

        <Link to="/wallet">
          <div
            onClick={() => changeSelected("wallet")}
            className={`icon-wrapper ${
              selected === "wallet" ? "selected" : ""
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
