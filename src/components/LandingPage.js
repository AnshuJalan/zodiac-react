import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import NavBar from './layout/NavbarLandingPage';

const LandingPage = () => {
    return (
    <React.Fragment>
        <BrowserRouter>
        <NavBar/>
        <div className="column-flex">
            <Grid container spacing={0}>
                <Grid item xs="6">
                    
                </Grid>
                <Grid item xs="6">
                    <img style={imageStyle} alt="brand" src={process.env.PUBLIC_URL + "/images/BitMarket.svg"} />
                </Grid>
            </Grid>
        </div>
        <Switch>
            {/* Change '/' route to landing page, and the rest accordingly */}
            {/* <Route exact path="/app" component={App} /> */}
            {/* <Route exact path="/markets/new" component={MarketCreate} /> */}
        </Switch>
      </BrowserRouter>
    </React.Fragment>
    )
}
const imageStyle={
    width:"40vw",
    height:"50vh",
  }

export default LandingPage
