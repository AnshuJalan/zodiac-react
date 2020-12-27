import React from "react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const App = () => {
  return (
    <div>
      <Sidebar />
      <div className="main-container">
        <Header />
      </div>
    </div>
  );
};

export default App;
