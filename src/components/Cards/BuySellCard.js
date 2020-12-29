import React, { useState } from "react";
import { Grid, Card, CardContent, Button, TextField } from "@material-ui/core";
import OrderCard from "./OrderCard";

const BuySellCard = () => {
  const [position, setPosition] = useState(0);
  const [type, setType] = useState(0);

  const renderButtons = () => {
    return (
      <Grid container spacing={3}>
        <Grid item sm={2}>
          <Button
            onClick={() => setType(0)}
            style={type === 0 ? buySelected : buyNormal}
            fullWidth
          >
            Buy
          </Button>
        </Grid>
        <Grid item sm={2}>
          <Button
            onClick={() => setType(1)}
            style={type === 1 ? sellSelected : sellNormal}
            fullWidth
          >
            Sell
          </Button>
        </Grid>
        <Grid item sm={4}>
          <Button
            onClick={() => setPosition(0)}
            style={position === 0 ? longSelected : longNormal}
            fullWidth
          >
            Long
          </Button>
        </Grid>
        <Grid item sm={4}>
          <Button
            onClick={() => setPosition(1)}
            style={position === 1 ? shortSelected : shortNormal}
            fullWidth
          >
            Short
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <Card>
      <CardContent style={{ height: "calc(100vh - 296px)" }}>
        {renderButtons()}
        <br />
        <div style={{ height: "65%", overflowY: "auto" }}>
          <OrderCard />
          <OrderCard />
        </div>
        <br />
        <Grid container spacing={1}>
          <Grid item sm={5}>
            <TextField
              variant="outlined"
              fullWidth
              label="Price in XTZ [0,1]"
              required
              margin="dense"
            />
          </Grid>
          <Grid item sm={5}>
            <TextField
              variant="outlined"
              fullWidth
              label="Quantity"
              required
              margin="dense"
            />
          </Grid>
          <Grid item sm={2}>
            <Button
              fullWidth
              disableElevation
              style={{ marginTop: "10px" }}
              variant="contained"
              color="primary"
            >
              {type === 0 ? "BUY" : "SELL"}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const longNormal = {
  color: "#4caf50",
  background: "#f8f8f8",
};

const longSelected = {
  background: "#4caf50",
  color: "#ffffff",
};

const shortNormal = {
  color: "#f44336",
  background: "#f8f8f8",
};

const shortSelected = {
  background: "#f44336",
  color: "#ffffff",
};

const buyNormal = {
  color: "#202020",
  background: "#f8f8f8",
};

const buySelected = {
  background: "#202020",
  color: "#ffffff",
};

const sellNormal = {
  color: "#202020",
  background: "#f8f8f8",
};

const sellSelected = {
  background: "#202020",
  color: "#ffffff",
};

export default BuySellCard;
