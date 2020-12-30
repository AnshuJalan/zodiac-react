import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import LandingPage from "../components/LandingPage";
import Wallet from "../components/Wallet";
import MarketsOpen from "./MarketsOpen";
import MarketCreate from "./MarketCreate";
import MarketAccount from "./MarketAccount";
import MainContainer from "./layout/MainContainer";
import MarketShow from "./MarketShow";
import { connectWallet } from "../actions";

const App = ({ connectWallet }) => {
  useEffect(() => {
    connectWallet(false);
  }, [connectWallet]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Sidebar />
        <Header />
        <Route exact path="/" component={LandingPage} />
        <MainContainer>
          <Switch>
            <Route exact path="/markets/open" component={MarketsOpen} />
            <Route exact path="/markets/new" component={MarketCreate} />
            <Route exact path="/market/show" component={MarketShow} />
            <Route exact path="/markets/account" component={MarketAccount} />
            <Route exact path="/wallet" component={Wallet} />
          </Switch>
        </MainContainer>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default connect(null, { connectWallet })(App);
