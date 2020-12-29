import React, { useEffect } from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { connect } from "react-redux";
import MarketInfoCard from "./Cards/MarketInfoCard";
import BuySellCard from "./Cards/BuySellCard";
import { loadMarketShow } from "../actions";

const MarketShow = (props) => {
  const { address } = props.location;
  const { loadMarketShow } = props;

  useEffect(() => {
    loadMarketShow(address);
  }, [loadMarketShow, address]);

  return (
    <div style={{ justifyContent: "flex-start" }} className="column-flex">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <MarketInfoCard />
        </Grid>
        <Grid item sm={6}>
          <BuySellCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default connect(null, { loadMarketShow })(MarketShow);
