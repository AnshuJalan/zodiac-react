import React from "react";

import "./Sidebar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <img
        width="72"
        alt="brand"
        src={process.env.PUBLIC_URL + "/images/brand.svg"}
      />
      <div className="sidebar-icons">
        <span className="material-icons">
          add_box
          <span className="tooltiptext">Create New Market</span>
        </span>
        <span title="Open Markets" className="material-icons">
          store
          <span className="tooltiptext">Open Markets</span>
        </span>
        <span title="Your Markets" className="material-icons">
          admin_panel_settings
          <span className="tooltiptext">Your Markets</span>
        </span>
        <div></div>
      </div>
      <div></div>
    </div>
  );
};

export default SideBar;
