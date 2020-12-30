import { CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import AccountCard from "./Cards/AccountCard";
import { loadMarketsAccount, loadMainContract } from "../actions";

const MarketAccount = (props) => {
  const {
    accountLoading,
    loadMarketsAccount,
    isWalletConnected,
    main,
    loadMainContract,
  } = props;

  useEffect(() => {
    if (isWalletConnected) {
      if (!main) {
        loadMainContract();
      } else {
        loadMarketsAccount();
      }
    }
  }, [
    accountLoading,
    loadMarketsAccount,
    loadMainContract,
    main,
    isWalletConnected,
  ]);

  if (!isWalletConnected) {
    return (
      <div className="column-flex">
        Thanos Wallet is not connected. Please go to wallet settings and connect
        Thanos.
      </div>
    );
  } else if (accountLoading) {
    return (
      <div className="column-flex">
        <CircularProgress color="primary" />
      </div>
    );
  } else if (props.marketsAccount.length === 0) {
    return (
      <div className="column-flex">
        No markets have been created by this account.
      </div>
    );
  }

  return (
    <div style={{ justifyContent: "flex-start" }} className="column-flex">
      <Grid container spacing={3}>
        {props.marketsAccount.map((market, index) => (
          <Grid key={index} item sm={12}>
            <AccountCard
              market={market}
              loadMarketsAccount={loadMarketsAccount}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isWalletConnected: state.wallet.connected,
    marketsAccount: state.markets.marketsAccount,
    main: state.contracts.main,
    accountLoading: state.markets.accountLoading,
  };
};

export default connect(mapStateToProps, {
  loadMarketsAccount,
  loadMainContract,
})(MarketAccount);
