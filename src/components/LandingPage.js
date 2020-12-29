import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import NavBar from "./layout/NavbarLandingPage";

const LandingPage = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Grid
        style={{ width: "80%", margin: "auto", marginTop: "56px" }}
        container
      >
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "baseline",
          }}
          item
          sm={5}
        >
          <div style={{ marginLeft: "20px", marginBottom: "35px" }}>
            <h1 style={{ margin: "0px" }}>PREDICTION MARKET ON TEZOS</h1>
            <p style={{ fontWeight: "lighter" }}>
              Bet on price trends, outcome of sports events & much more. Click
              on start trading to head over to the marketplace.
            </p>
            <Link style={{ textDecoration: "none" }} to="/markets/open">
              <Button
                variant="contained"
                size="large"
                style={{ color: "white", background: "#202020" }}
              >
                START TRADING
              </Button>
            </Link>
          </div>
        </Grid>
        <Grid item sm={7}>
          <img
            alt="Landing page"
            width="100%"
            style={{ opacity: 0.9 }}
            src={process.env.PUBLIC_URL + "/images/landing.svg"}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default LandingPage;
