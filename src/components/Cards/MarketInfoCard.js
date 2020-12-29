import React from "react";
import { Card, CardContent } from "@material-ui/core";

const MarketInfoCard = () => {
  return (
    <Card>
      <CardContent>
        <p style={pStyle}>TITLE / QUESTION</p>
        <h2 style={{ margin: "5px 0px 10px 0px" }}>
          Will India win the 2nd test match versus Australia?
        </h2>
        <p style={pStyle}>RESOLUTION SOURCE</p>
        <a
          style={{
            textDecoration: "none",
            color: "#3f51b5",
            display: "block",
            marginTop: "7px",
          }}
          href="/"
        >
          https://espnsports.com
        </a>
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
