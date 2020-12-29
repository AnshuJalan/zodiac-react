import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import LandingPage from "../components/LandingPage";
import Wallet from "../components/Wallet";
import MarketsOpen from "./MarketsOpen";
import MarketCreate from "./MarketCreate";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Sidebar />
        <Header />
        <Route exact path="/" component={LandingPage} />
        <div className="main-container">
          <Switch>
            <Route exact path="/markets/open" component={MarketsOpen} />
            <Route exact path="/markets/new" component={MarketCreate} />
            <Route exact path="/markets/account" component={Wallet} />
            <Route exact path="/wallet" component={Wallet} />
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
