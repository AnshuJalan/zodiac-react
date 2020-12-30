import React from "react";
import { Card, CardContent, Grid } from "@material-ui/core";

const MarketInfoCard = (props) => {
  return (
    <Card>
      <CardContent>
        <p style={pStyle}>TITLE / QUESTION</p>
        <h2 style={{ margin: "5px 0px 10px 0px" }}>{props.title}</h2>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <p style={pStyle}>RESOLUTION SOURCE</p>
            <a
              style={{
                textDecoration: "none",
                color: "#3f51b5",
                display: "block",
                marginTop: "7px",
              }}
              href={props.resolution}
            >
              {props.resolution}
            </a>
          </Grid>
          <Grid item sm={4}>
            <p style={pStyle}>ENDING TIME</p>
            <p style={{ marginTop: 7 }}>{props.endTime}</p>
          </Grid>
          <Grid item sm={2}>
            {props.result >= 0 ? (
              <span style={{ fontWeight: "bold", color: "red" }}>• CLOSED</span>
            ) : (
              <span style={{ fontWeight: "bold", color: "green" }}>• OPEN</span>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const pStyle = {
  margin: "0px",
  fontWeight: "lighter",
  fontSize: "16px",
};

export default MarketInfoCard;
