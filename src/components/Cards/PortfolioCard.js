import { Button, Card, CardContent, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import ShareCard from "./ShareCard";

const PortfolioCard = (props) => {
  const { sharesLong, sharesShort, result, address } = props.market;

  const [loading, setLoading] = useState(false);

  const withdrawPayout = async () => {
    try {
      setLoading(true);
      const operation = await props.market.instance.methods
        .withdrawPayout([["unit"]])
        .send();
      await operation.confirmation();
      await props.loadMarketShow(address);
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  };

  const showSharesLong = sharesLong.map((share, index) => (
    <ShareCard
      key={index}
      price={share[0] / 1000000}
      quantity={share[1].toNumber() / 10}
      position={0}
    />
  ));

  const showSharesShort = sharesShort.map((share, index) => (
    <ShareCard
      key={index}
      price={share[0] / 1000000}
      quantity={share[1].toNumber() / 10}
      position={1}
    />
  ));

  const noShares =
    !sharesLong.length && !sharesShort.length ? (
      <p
        style={{
          fontWeight: "lighter",
          textAlign: "center",
          paddingTop: "50px",
        }}
      >
        {result === null
          ? "No shares available to show."
          : "Market has been closed."}
      </p>
    ) : (
      <></>
    );

  const getButton = () => {
    if (result === null) return true;
    else if (result.toNumber() === 0 && sharesLong.length) return false;
    else if (result.toNumber() === 1 && sharesShort.length) return false;

    return true;
  };

  return (
    <Card>
      <CardContent style={{ height: "calc(100vh - 296px)" }}>
        <p style={{ fontWeight: "bold", textAlign: "center", margin: 0 }}>
          Your Portfolio
        </p>
        <br />
        <div style={{ height: "75%", overflowY: "auto" }}>
          {showSharesLong}
          {showSharesShort}
          {noShares}
        </div>
        <Button
          onClick={() => withdrawPayout()}
          disabled={getButton()}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "12px" }}
        >
          {loading ? (
            <>
              <CircularProgress
                style={{ color: "#ffffff", marginRight: 10 }}
                size={20}
              />
              CONFIRMING WITHDRAWAL
            </>
          ) : (
            "WITHDRAW PAYOUT"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    market: state.markets.market,
  };
};

export default connect(mapStateToProps)(PortfolioCard);
