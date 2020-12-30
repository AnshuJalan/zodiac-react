import React, { useEffect } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import MarketCard from "../components/Cards/MarketCard";
import { loadMainContract, loadMarkets } from "../actions";

const OpenMarket = (props) => {
  const { isWalletConnected, loadMainContract, loadMarkets } = props;
  const main = props?.contracts.main;
  const marketsLoading = props.contracts.loading;

  useEffect(() => {
    if (isWalletConnected) {
      if (!main) {
        loadMainContract();
      } else {
        loadMarkets();
      }
    }
  }, [loadMainContract, isWalletConnected, main, loadMarkets, marketsLoading]);

  if (!isWalletConnected) {
    return (
      <div className="column-flex">
        Thanos Wallet is not connected. Please go to wallet settings and connect
        Thanos.
      </div>
    );
  } else if (props.contracts.loading) {
    return (
      <div className="column-flex">
        <CircularProgress color="primary" />
      </div>
    );
  } else if (props.contracts.markets.size === 0) {
    <div className="column-flex">No markets are available.</div>;
  }

  return (
    <div style={{ justifyContent: "flex-start" }} className="column-flex">
      <Grid container spacing={1}>
        {props.contracts.markets.map((market, index) => {
          return (
            <Grid key={index} item sm={6}>
              <MarketCard market={market} history={props.history} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isWalletConnected: state.wallet.connected,
    contracts: state.contracts,
  };
};

export default connect(mapStateToProps, { loadMainContract, loadMarkets })(
  OpenMarket
);
