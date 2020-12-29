import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import MarketInfoCard from "./Cards/MarketInfoCard";
import BuySellCard from "./Cards/BuySellCard";

const MarketShow = () => {
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

export default MarketShow;
