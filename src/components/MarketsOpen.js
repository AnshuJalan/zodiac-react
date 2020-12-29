import React, { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { loadMainContract, loadMarkets } from "../actions";

const OpenMarket = (props) => {
  const { isWalletConnected, loadMainContract, loadMarkets } = props;
  const main = props?.contracts.main;

  useEffect(() => {
    if (isWalletConnected) {
      if (!main) {
        loadMainContract();
      } else {
        loadMarkets();
      }
    }
  }, [loadMainContract, isWalletConnected, main, loadMarkets]);

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
  } else {
    return props.contracts.markets.size === 0 ? (
      <div className="column-flex">No markets are available.</div>
    ) : (
      <></>
    );
  }
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
