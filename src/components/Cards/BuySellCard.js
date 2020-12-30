import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import OrderCard from "./OrderCard";

const BuySellCard = (props) => {
  const [position, setPosition] = useState(0);
  const [type, setType] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

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

  const { instance, address } = props.market;

  const buyLong = async () => {
    try {
      setLoading(true);
      const operation = await instance.methods
        .buyLong(price * 1000000, quantity * 10)
        .send({
          amount: quantity * price,
        });
      await operation.confirmation();
      //Load portfolio
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const buyShort = async () => {
    try {
      setLoading(true);
      const operation = await instance.methods
        .buyShort(price * 1000000, quantity * 10)
        .send({
          amount: quantity * price,
        });
      await operation.confirmation();
      //Load portfolio
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const sellLong = async () => {
    try {
      setLoading(true);
      const operation = await instance.methods
        .sellLong(buyPrice * 1000000, price * 1000000, quantity * 10)
        .send();
      await operation.confirmation();
      //Load portfolio
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const sellShort = async () => {
    try {
      setLoading(true);
      const operation = await instance.methods
        .sellShort(buyPrice * 1000000, price * 1000000, quantity * 10)
        .send();
      await operation.confirmation();
      //Load portfolio
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const onSubmit = () => {
    if (price <= 0 || quantity <= 0) {
      alert("Please enter a valid price & quantity");
      return;
    }

    if (position === 0 && type === 0) buyLong();
    else if (position === 1 && type === 0) buyShort();
    else if (position === 0 && type === 1) sellLong();
    else sellShort();
  };

  const setPriceVal = (val) => {
    const check = val * 10;
    if (check < 10 && check >= 0 && check % 1 === 0) {
      setPrice(val);
    }
  };

  const setQuantityVal = (val) => {
    const check = val * 10;
    if (check >= 0 && check % 1 === 0) {
      setQuantity(val);
    }
  };

  const setBuyPriceVal = (val) => {
    const check = val * 10;
    if (check < 10 && check >= 0 && check % 1 === 0) {
      setBuyPrice(val);
    }
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
          {type === 0 ? (
            <Grid item sm={5}>
              <TextField
                variant="outlined"
                fullWidth
                label="Price in XTZ [0,1]"
                required
                margin="dense"
                value={price}
                onChange={(e) => setPriceVal(e.target.value)}
              />
            </Grid>
          ) : (
            <>
              <Grid item sm={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Buy Price (XTZ)"
                  required
                  margin="dense"
                  value={buyPrice}
                  onChange={(e) => setBuyPriceVal(e.target.value)}
                />
              </Grid>
              <Grid item sm={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Sell Price (XTZ)"
                  required
                  margin="dense"
                  value={price}
                  onChange={(e) => setPriceVal(e.target.value)}
                />
              </Grid>
            </>
          )}
          <Grid item sm={type === 0 ? 5 : 4}>
            <TextField
              variant="outlined"
              fullWidth
              label="Quantity (1 dec place)"
              required
              margin="dense"
              value={quantity}
              onChange={(e) => setQuantityVal(e.target.value)}
            />
          </Grid>
          <Grid item sm={2}>
            <Button
              fullWidth
              disableElevation
              style={{ marginTop: "10px" }}
              variant="contained"
              color="primary"
              onClick={() => onSubmit()}
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : type === 0 ? (
                "BUY"
              ) : (
                "SELL"
              )}
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

const mapStateToProps = (state) => {
  return {
    market: state.markets.market,
  };
};

export default connect(mapStateToProps)(BuySellCard);
