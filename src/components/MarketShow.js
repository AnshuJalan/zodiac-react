import React, { useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import MarketInfoCard from "./Cards/MarketInfoCard";
import BuySellCard from "./Cards/BuySellCard";
import { loadMarketShow } from "../actions";
import PortfolioCard from "./Cards/PortfolioCard";

const MarketShow = (props) => {
  const { address, title, resolution } = props.location.market;
  const { loadMarketShow, history, endTime, result } = props;

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
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <MarketInfoCard
            title={title}
            resolution={resolution}
            endTime={endTime.toLocaleString()}
            result={result?.toNumber()}
          />
        </Grid>
        <Grid item sm={6}>
          <BuySellCard history={history} />
        </Grid>
        <Grid item sm={6}>
          <PortfolioCard loadMarketShow={loadMarketShow} />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    marketLoading: state.markets.marketLoading,
    endTime: state.markets.market.endTime,
    result: state.markets.market.result,
  };
};

export default connect(mapStateToProps, { loadMarketShow })(MarketShow);
