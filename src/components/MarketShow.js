import React, { useEffect } from "react";
import { Grid, Card, CardContent, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import MarketInfoCard from "./Cards/MarketInfoCard";
import BuySellCard from "./Cards/BuySellCard";
import { loadMarketShow } from "../actions";

const MarketShow = (props) => {
  const { address } = props.location;
  const { loadMarketShow, history } = props;

  useEffect(() => {
    if (!address) {
      history.push("/markets/open");
    } else {
      loadMarketShow(address);
    }
  }, [loadMarketShow, address, history]);

  if (props.marketLoading) {
    return (
      <div className="column-flex">
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <div style={{ justifyContent: "flex-start" }} className="column-flex">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <MarketInfoCard />
        </Grid>
        <Grid item sm={6}>
          <BuySellCard history={history} />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    marketLoading: state.markets.marketLoading,
  };
};

export default connect(mapStateToProps, { loadMarketShow })(MarketShow);
